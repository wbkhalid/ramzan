// 🔐 FULL backend response (SERVER ONLY)
export interface BackendLoginResponse {
  Version: string;
  StatusCode: number;
  Message: string;
  Result?: {
    Token: string;
    LoginUserId: number;
    UserName: string;
    EmpName: string;
    UserTypeId: number;
    UserType: string;
    DefaultPermission: string;
    MenuGroups: unknown[];
    BackendPermissions: Array<{
      Id: number;
      ApplicationName: string;
      PermissionFor: number | string;
      DisplayText: string;
      Area: string;
      Controller: string;
      Action: string;
      IsMenu: boolean;
      Icon: string;
      Url: string;
    }>;
  };
  Timestamp: string;
  Errors: unknown[];
}

// 🌍 CLIENT-SAFE response (what browser receives)
export interface LoginClientResponse {
  StatusCode: number;
  Message: string;
}
