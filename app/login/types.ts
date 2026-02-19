// 🔐 FULL backend response (SERVER ONLY)
export interface BackendLoginResponse {
  responseCode: number;
  responseMessage: string;
  data: {
    token: string;
    expiration: string;
    roles: string[];
    rights: string[];
    userProfile: {
      id: number;
      userId: string;
      fullName: string;
      email: string;
      cnic: string;
      phoneNumber: string;
      address: string;
      provinceId: number;
      divisionId: number;
      districtId: number;
      tehsilId: number;
      houseNo: string;
      streetNo: string;
      landMark: string;
      profilePicture: string;
      createdAt: string;
      updatedAt: string;
      deviceId: number;
      deviceType: string;
      otp: number;
    };
  };
}

// 🌍 CLIENT-SAFE response (what browser receives)
export interface LoginClientResponse {
  StatusCode: number;
  Message: string;
}
