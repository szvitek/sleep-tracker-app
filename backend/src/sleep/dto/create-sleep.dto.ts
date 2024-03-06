export class CreateSleepDto {
  readonly name: string;
  readonly gender: 'Male' | 'Female' | 'Other';
  readonly duration: number;
}
