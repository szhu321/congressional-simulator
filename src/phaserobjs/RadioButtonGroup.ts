import RadioButton from "./RadioButton";

export default class RadioButtonGroup
{
    private radioButtons: RadioButton[];

    constructor()
    {
        this.radioButtons = new Array<RadioButton>();
    }

    /**
     * Adds a new radio button to the array. When added the radiobutton becomes connected.
     * Note that if a radio button is already in the array it will not be added.
     * Any action on one radiobutton will be refelected on the other radio buttons.
     * @param radioButton - The radioButton to add. 
     */
    public addRadioButton(radioButton: RadioButton)
    {
        if(this.radioButtons.indexOf(radioButton) === -1)
        {
            this.radioButtons.push(radioButton);
            radioButton.setRadioButtonGroup(this);
        }
    }

    /**
     * Add radio buttons. Note that if the radio button already exist in the array it will
     * not be added.
     * @param radioButton - A rest parameter of an unlimited number of radio buttons.
     */
    public addRadioButtons(...radioButtons: RadioButton[])
    {
        for(let btn of radioButtons)
        {
            this.addRadioButton(btn);
        }
    }

    /**
     * Trys to remove the provided radio button.
     * @param radioButton - The radio button to remove.
     * @returns True if the button was removed. False if the button was not found.
     */
    public removeRadioButton(radioButton: RadioButton): boolean
    {
        let idx = this.radioButtons.indexOf(radioButton);
        if(idx >= 0)
        {
            this.radioButtons.splice(idx, 1);
            return true;
        }
        return false;
    }

    /**
     * Gets the radio button that is selected. Null if none of them are selected.
     * @returns The selected radio button.
     */
    public getSelectedRadioButton(): RadioButton
    {
        for(let btn of this.radioButtons)
        {
            if(btn.isSelected())
                return btn;
        }
        return null;
    }

    /**
     * Gets the index of the selected radio button;
     * @returns The index of the selected radio button. -1 if none of them are selected.
     */
    public getSelectedRadioButtonIdx(): number
    {
        let selectedRadioButton = this.getSelectedRadioButton();
        if(selectedRadioButton)
        {
            return this.radioButtons.indexOf(selectedRadioButton);
        }
        return -1;
    }

    /**
     * This will be called by the api to select and deselect the radio buttons.
     * @param radioButton - The radio button that will be selected. (filled in)
     */
    public selectRadioButton(radioButton: RadioButton)
    {
        let idx = this.radioButtons.indexOf(radioButton);
        if(idx === -1)
            return;
        for(let btn of this.radioButtons)
        {
            btn.setSelected(false);
        } 
        this.radioButtons[idx].setSelected(true);
    }
}