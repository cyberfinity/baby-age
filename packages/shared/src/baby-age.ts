import { DateTime, DurationObject, Interval } from 'luxon';

export class BabyAge {
  readonly #dob: DateTime;
  readonly #age: Interval;

  constructor(birthYear: number, birthMonth: number, birthDay: number, currentData?: DateTime) {
    this.#dob = DateTime.local(birthYear,birthMonth, birthDay);
    const now = currentData || DateTime.local();

    this.#age = Interval.fromDateTimes(this.#dob, now);
  }

  days(exact = false): number {
    const exactDays = this.#age.toDuration('days').toObject().days!;
    return exact ? exactDays : Math.floor(exactDays);
  }

  dayNumber(): number {
    return this.days() + 1;
  }

  weeks(exact = false): number {
    const exactWeeks = this.#age.toDuration('weeks').toObject().weeks!;
    return exact ? exactWeeks : Math.floor(exactWeeks);
  }

  weekNumber(): number {
    return this.weeks() + 1;
  }

  months(exact = false): number {
    const exactMonths = this.#age.toDuration('months').toObject().months!;
    return exact ? exactMonths : Math.floor(exactMonths);
  }

  monthNumber(): number {
    return this.months() + 1;
  }

  years(exact = false): number {
    const exactYears = this.#age.toDuration('years').toObject().years!;
    return exact ? exactYears : Math.floor(exactYears);
  }

  yearsMonthsAndDays(exact = false): Pick<DurationObject, 'years'|'months'|'days'> {
    const exactAge = this.#age.toDuration(['years','months','days']).toObject();
    return exact ? exactAge : {
      years: Math.floor(exactAge.years!),
      months: Math.floor(exactAge.months!),
      days: Math.floor(exactAge.days!),
    };
  }

  whenIsDayNumber(dayNumber: number) {
    return this.#dob.plus({ days: (dayNumber - 1)});
  }
}

export function toOrdinal(num: number): string {
  if (num <= 10 || num >= 20) {
    const lastDigits = num % 10;
    if (lastDigits === 1) {
      return `${num}st`;
    }
    else if (lastDigits === 2) {
      return `${num}nd`;
    }
    else if (lastDigits === 3) {
      return `${num}rd`;
    }
  }
  // else:
  return `${num}th`;
}
