import { SetMetadata } from '@nestjs/common';

import { SKIP_AUTH } from '../constants';
// “This endpoint does NOT require authorization”
export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
