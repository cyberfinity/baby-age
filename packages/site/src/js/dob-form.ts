import { DateTime } from 'luxon';

export type SubmitCallback = (day: number, month: number, year: number) => void;

export class DobForm {
  private _formElement: HTMLFormElement;
  private _dayInput: HTMLInputElement;
  private _monthInput: HTMLInputElement;
  private _yearInput: HTMLInputElement;
  private _submitCallback: SubmitCallback;

  constructor(formElement: HTMLElement | null, submitCallback: SubmitCallback) {
    if (formElement === null || !(formElement instanceof HTMLFormElement)) {
      throw new Error(`${formElement} is not a form!`);
    }
    this._submitCallback = submitCallback;

    this._formElement = formElement;
    formElement.addEventListener('submit', this._handleSubmit.bind(this));

    this._dayInput = this._initInput('day' /*, this._validateDay.bind(this)*/);
    this._monthInput = this._initInput('month');
    this._yearInput = this._initInput('year');
  }

  private _initInput(inputName: string, inputListener?: (event: Event) => void): HTMLInputElement {
    const input = this._formElement.querySelector<HTMLInputElement>(`input[name="${inputName}"]`);
    if (input === null) {
      throw new Error(`Input "${inputName}" is missing`);
    }
    if (inputListener) {
      input.addEventListener('input', inputListener);
    }
    return input;
  }

  private _handleSubmit(event: Event): void {
    event.preventDefault();
    this._submitCallback(this.getDay(), this.getMonth(), this.getYear());
  }

  private _validateDay(): void {
    if (this._dayInput.validity.valid) {
      // Passed required & regex validation...
      let isValidDay = true;

      const day = this.getDay();
      if (this._hasMonthValue() && this._hasYearValue()) {
        // But could still be an invalid date
        const month = this.getMonth();
        if (month === 2) {
          const isLeapYear = DateTime.local(this.getYear()).isInLeapYear;
          if ((isLeapYear && day > 29) || (!isLeapYear && day > 28)) {
            isValidDay = false;
          }
        }
        else if ([4,6,9,11].includes(month) && day > 30) {
          isValidDay = false;
        }
      }

      console.log(`Day validity is: ${isValidDay}`);
      if (!isValidDay) {
        this._dayInput.setCustomValidity(`${day} is not a valid day for the given month and year.`);
      }
    }
  }

  private _hasMonthValue(): boolean {
    return this._monthInput.value.trim().length > 0;
  }

  private _hasYearValue(): boolean {
    return this._yearInput.value.trim().length > 0;
  }

  public getDay(): number {
    return parseInt(this._dayInput.value);
  }

  public getMonth(): number {
    return parseInt(this._monthInput.value);
  }

  public getYear(): number {
    return parseInt(this._yearInput.value);
  }
}
