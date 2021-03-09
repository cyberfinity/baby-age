import { BabyAge, toOrdinal } from '@cyberfinity/baby-age-shared';
import { DateTime } from 'luxon';

export class AgeDisplay {
  private _containerEl: HTMLElement;
  private _days: HTMLParagraphElement;
  private _weeksAndDays: HTMLParagraphElement;
  private _yearsMonthsAndDays: HTMLParagraphElement;
  private _whichDay: HTMLParagraphElement;
  private _whichWeek: HTMLParagraphElement;

  constructor(containerEl: HTMLElement | null) {
    if (containerEl === null) {
      throw new Error('Age display element not found');
    }
    this._containerEl = containerEl;

    this._days = document.createElement('p');
    this._weeksAndDays = document.createElement('p');
    this._yearsMonthsAndDays = document.createElement('p');
    this._whichDay = document.createElement('p');
    this._whichWeek = document.createElement('p');

    this._containerEl.appendChild(this._days);
    this._containerEl.appendChild(this._weeksAndDays);
    this._containerEl.appendChild(this._yearsMonthsAndDays);
    this._containerEl.appendChild(this._whichDay);
    this._containerEl.appendChild(this._whichWeek);
  }

  renderAge = (day: number, month: number, year: number) => {
    const age = new BabyAge(year, month, day);

    this._days.textContent = `${age.days()} days old.`;
    const weeksDays = age.weeksAndDays();
    this._weeksAndDays.textContent = `${weeksDays.weeks} weeks and ${weeksDays.days} days old.`;
    const yearsMonthsDays = age.yearsMonthsAndDays();
    this._yearsMonthsAndDays.textContent = `${yearsMonthsDays.years} years, ${yearsMonthsDays.months} months and ${yearsMonthsDays.days} days old.`;

    this._whichDay.textContent = `This is the ${toOrdinal(age.days() + 1)} day (the 100th day is ${age.whenIsDayNumber(100).toLocaleString(DateTime.DATE_FULL)})`;
    this._whichWeek.textContent = `This is the ${toOrdinal(age.weeks() + 1)} week`;
  }
}
