import { FormControl, ValidationErrors } from '@angular/forms';

export class Validator {
    static cannotLessorEqualzero(control: FormControl): ValidationErrors | null {
        if ((control.value as number) < 0) {
            return { "cannotLessorEqualzero": true }
        }

        return null;
    }

    static LessThanToday(control: FormControl): ValidationErrors | null {
        let today: Date = new Date();
        if (new Date(control.value) > today)
            return { "LessThanToday": true };

        return null;
    }
}