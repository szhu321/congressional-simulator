import BoardModel from "../models/BoardModel";

export default class BoardController
{
    model;

    /**
     * @param {BoardModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new BoardModel();
    }


    /**
     * Move a card from player1's hand to player1's board.
     * @param {Number} idx - the index of the card in player1's hand to play.
     * @returns {Boolean} True if the operation succeeced. False otherwise.
     */
    playCardPlayer1(idx)
    {
        let turn = this.model.getTurn();
        if(turn != this.model.TURN.PLAYER1)
        {
            console.log("playCardPlayer1() Failed: Not player1's turn.");
            return false;
        }
        let card = this.model.getPlayer1Hand().getCardAt(idx);
        //let card = this.model.getPlayer1Hand().removeAtIdx(idx);
        if(!card)
        {
            console.log(`playCardPlayer1() Failed: Card at index ${idx} not found.`);
            return false;
        }
        //Play the card. the will cost some money.
        let player1Money = this.model.getPlayer1Money();
        let cardCost = card.getCost();
        if(cardCost > player1Money)
        {
            console.log(`playCardPlayer1() Failed: Not enougth money ($${player1Money}). Card cost: $${cardCost}`);
            return false;
        }
        this.model.setPlayer1Money(player1Money - cardCost);
        this.model.player1Board.addCard(card);
    }

    /**
     * Move a card from player2's hand to player2's board.
     * @param {Number} idx - the index of the card in player2's hand to play.
     * @returns {Boolean} True if the operation succeeced. False otherwise.
     */
    playCardPlayer2(idx)
    {
        let turn = this.model.getTurn();
        if(turn != this.model.TURN.PLAYER2)
        {
            console.log("playCardPlayer2() Failed: Not player2's turn.");
            return false;
        }
        let card = this.model.getPlayer2Hand().getCardAt(idx);
        //let card = this.model.getPlayer2Hand().removeAtIdx(idx);
        if(!card)
        {
            console.log(`playCardPlayer2() Failed: Card at index ${idx} not found.`);
            return false;
        }
        //Play the card. the will cost some money.
        let player2Money = this.model.getPlayer2Money();
        let cardCost = card.getCost();
        if(cardCost > player2Money)
        {
            console.log(`playCardPlayer2() Failed: Not enougth money ($${player2Money}). Card cost: $${cardCost}`);
            return false;
        }
        this.model.setPlayer2Money(player2Money - cardCost);
        this.model.player2Board.addCard(card);
    }

    //clicked on next turn.
    nextTurn()
    {
        //TODO: next turn.
        this.model.switchTurn();
        if(this.model.getTurn() === this.model.TURN.PLAYER1)
        {
            let cards = this.model.getPlayer1Board().getCards();
            for(let card of cards)
            {
                if(!card.getIsWorker())
                {
                    card.setAction(1);
                }
            }
        }
        else
        {
            let cards = this.model.getPlayer2Board().getCards();
            for(let card of cards)
            {
                if(!card.getIsWorker())
                {
                    card.setAction(1);
                }
            }
        }
    }
    
    //draw a card for player1.
    drawCardPlayer1()
    {
        //make sure that the hand has 5 card already.
        if(this.model.getPlayer1Hand().getCards().length <= 5)
        {
            console.log("drawCardPlayer1() Failed: cannot draw card maximum card is 5");
            return false;
        }
        //TODO: make sure that the player hasn't already drawn a card.
        //if there are no more cards in the deck shffule cards from the discard pile.
        if(this.model.getPlayer1DrawDeck().getCards().length == 0)
        {
            console.log("drawCardPlayer1() Failed: shuffling discard cards back into player deck.");
            let cards = this.model.getPlayer1DiscardDeck().removeAllCards();
            this.model.getPlayer1DrawDeck().addAllCards(cards);
            this.model.getPlayer1DrawDeck().shuffle();
            return true;
        }
        
        //if there are still no cards then we cannot draw.
        if(this.model.getPlayer1DrawDeck().getCards().length == 0)
        {
            console.log("drawCardPlayer1() Failed: Failed to draw a card. no cards in draw and discard deck.");
        }

        let card = this.model.getPlayer1DrawDeck().removeFirst();
        this.model.getPlayer1Hand().addCard(card);
    }
    
    //draw a card for player2.
    drawCardPlayer2()
    {
        //make sure that the hand has 5 card already.
        if(this.model.getPlayer2Hand().getCards().length <= 5)
        {
            console.log("drawCardPlayer2() Failed: cannot draw card maximum card is 5");
            return false;
        }
        //TODO: make sure that the player hasn't already drawn a card.
        //if there are no more cards in the deck shffule cards from the discard pile.
        if(this.model.getPlayer2DrawDeck().getCards().length == 0)
        {
            console.log("drawCardPlayer2() Failed: shuffling discard cards back into player deck.");
            let cards = this.model.getPlayer2DiscardDeck().removeAllCards();
            this.model.getPlayer2DrawDeck().addAllCards(cards);
            this.model.getPlayer2DrawDeck().shuffle();
            return true;
        }
        
        //if there are still no cards then we cannot draw.
        if(this.model.getPlayerDrawDeck().getCards().length == 0)
        {
            console.log("drawCardPlayer2() Failed: Failed to draw a card. no cards in draw and discard deck.");
        }

        let card = this.model.getPlayer2DrawDeck().removeFirst();
        this.model.getPlayer2Hand().addCard(card);
    }
    
    //player1 card attack player2 card.
    attackPlayer2Card(player1CardIdx, player2CardIdx)
    {
        let player1Card = this.model.getPlayer1Board().getCardAt(player1CardIdx);
        let player2Card = this.model.getPlayer2Board().getCardAt(player2CardIdx);
        if(!player1Card)
        {
            console.log("attackPlayer2Card() Failed: Player 1 card does not exist");
            return;
        }
        if(!player2Card)
        {
            console.log("attackPlayer2Card() Failed: Player 2 card does not exist");
            return;
        }
        if(!player1Card.hasAction())
        {
            console.log("attackPlayer2Card() Failed: Player 1 card has no action; cannot attack");
            return;
        }
        let damage1 = player1Card.getAttack();
        let damage2 = player2Card.getAttack();
        player1Card.setHealth(player1Card.getHealth() - damage2);
        player2Card.setHealth(player2Card.getHealth() - damage1);
        player1Card.useAction();
        if(player1Card.getHealth() <= 0)
        {
            this.model.getPlayer1Board().removeAtIdx(player1CardIdx);
            this.model.getPlayer1DiscardDeck().addCard(player1Card);
        }
        if(player2Card.getHealth <= 0)
        {
            this.model.getPlayer2Board().removeAtIdx(player2CardIdx);
            this.model.getPlayer2DiscardDeck().addCard(player2Card);
        }
    }

    //player2 card attack player1 card.
    attackPlayer1Card(player2CardIdx, player1CardIdx)
    {
        let player1Card = this.model.getPlayer1Board().getCardAt(player1CardIdx);
        let player2Card = this.model.getPlayer2Board().getCardAt(player2CardIdx);
        if(!player1Card)
        {
            console.log("attackPlayer1Card() Failed: Player 1 card does not exist");
            return;
        }
        if(!player2Card)
        {
            console.log("attackPlayer1Card() Failed: Player 2 card does not exist");
            return;
        }
        if(!player2Card.hasAction())
        {
            console.log("attackPlayer1Card() Failed: Player 2 card has no action; cannot attack");
            return;
        }
        let damage1 = player1Card.getAttack();
        let damage2 = player2Card.getAttack();
        player1Card.setHealth(player1Card.getHealth() - damage2);
        player2Card.setHealth(player2Card.getHealth() - damage1);
        player2Card.useAction();
        if(player1Card.getHealth() <= 0)
        {
            this.model.getPlayer1Board().removeAtIdx(player1CardIdx);
            this.model.getPlayer1DiscardDeck().addCard(player1Card);
        }
        if(player2Card.getHealth <= 0)
        {
            this.model.getPlayer2Board().removeAtIdx(player2CardIdx);
            this.model.getPlayer2DiscardDeck().addCard(player2Card);
        }
    }
    
    
    //player1 card attack opponent.
    attackPlayer2(cardIdx)
    {
        //only allowed if the opponent have no worker card on defense mode.
        let player1Card = this.model.getPlayer1Board().getCardAt(cardIdx);
        if(!player1Card)
        {
            console.log("attackPlayer2() Failed: Player 1 card does not exist");
            return;
        }
        if(!player1Card.hasAction())
        {
            console.log("attackPlayer2() Failed: Player 1 card has no action; cannot attack");
            return;
        }
        if(this.model.isPlayer2OnDefensive())
        {
            console.log("attackPlayer2() Failed: Player 2 has at lease one worker on defensive.");
            return;
        }
        let damage = player1Card.getAttack();
        this.model.transferVotesPlayer2ToPlayer1(damage);
        player1Card.useAction();

        if(this.model.getPlayer2Votes() <= 0)
        {
            console.log("*********GAME OVER: Player 1 wins*************");
        }
    }

    //player2 card attack us.
    attackPlayer1(cardIdx)
    {
        //only allowed if we have no worker card on defense mode.
        let player2Card = this.model.getPlayer2Board().getCardAt(cardIdx);
        if(!player2Card)
        {
            console.log("attackPlayer1() Failed: Player 2 card does not exist");
            return;
        }
        if(!player2Card.hasAction())
        {
            console.log("attackPlayer1() Failed: Player 2 card has no action; cannot attack");
            return;
        }
        if(this.model.isPlayer1OnDefensive())
        {
            console.log("attackPlayer1() Failed: Player 1 has at lease one worker on defensive.");
            return;
        }
        let damage = player2Card.getAttack();
        this.model.transferVotesPlayer1ToPlayer2(damage);
        player2Card.useAction();

        if(this.model.getPlayer1Votes() <= 0)
        {
            console.log("*********GAME OVER: Player 2 wins*************");
        }
    }

    //queue system for abilites.
    //ability parser.
    //when the ability is activated. [when 'played', 'damaged', 'attacks']
    //queue the action in the correct place. The action queue is then performed at the correct time.
    //queues: pending actions, start of round, pending actions, end of round.
}