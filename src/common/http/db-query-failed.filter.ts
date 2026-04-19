import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { DbFieldForErrorConstants } from '../constants';
import { DataBaseErrorCode } from '../enums/data-base-error-code.enum';
import { TransformHelper } from '../helpers/transform.helper';

// превращает “сырую SQL ошибку” в понятное сообщение для API
export class DbQueryFailedFilter {
  static filter(exception: QueryFailedError) {
    let status = HttpStatus.UNPROCESSABLE_ENTITY;
    let message = (exception as QueryFailedError).message;
    let code = (exception as any).code;

    if (
      (exception as any).code === DataBaseErrorCode.PgUniqueConstraintViolation
    ) {
      const detail = (exception as any).detail;

      let key = detail
        .match(/(?<=\().+?(?=\)=)/g)[0]
        .split(',')[0]
        .replace(/[^a-z ]/gim, '');
      const value = detail.match(/(?<==\().+?(?=\))/g)[0].split(',')[0];

      key = DbFieldForErrorConstants[key] || TransformHelper.capitalize(key);

      status = HttpStatus.CONFLICT;
      message = `${key} ${value} already exists`;
      code = (exception as any).code;
    }

    return { status, message, code };
  }
}
