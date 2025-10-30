import * as migration_20251030_085700 from './20251030_085700';

export const migrations = [
  {
    up: migration_20251030_085700.up,
    down: migration_20251030_085700.down,
    name: '20251030_085700'
  },
];
