/* eslint-disable */

declare namespace MongoAPI {
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'INTERN' | 'JUNIOR' | 'SENIOR';

  interface UserInfo {
    _id?: string;
    name?: string;
    position?: string;
    level?: string;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    position?: string;
    /** email */
    level?: string;
  }

  type definitions_0 = null;
}
