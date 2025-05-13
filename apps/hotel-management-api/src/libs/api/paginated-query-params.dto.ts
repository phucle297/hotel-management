import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export enum EParam {
  Asc = 'asc',
  Desc = 'desc',
}

export class OrderBy {
  @ApiProperty()
  @IsString()
  field: string;

  @ApiProperty({
    enum: EParam,
  })
  @IsEnum(EParam)
  param: EParam;
}

export class PaginatedQueryParams {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(99999)
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional()
  orderBy?: OrderBy;
}

export class PaginatedResponse<T> {
  @IsArray()
  @Expose()
  data: T[];

  @ApiProperty()
  @IsInt()
  @Expose()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @Expose()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
