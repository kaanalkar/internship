import { Transform } from 'class-transformer';

export const Trimmed = () =>
  Transform(({ value }) =>
    typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value
  );
