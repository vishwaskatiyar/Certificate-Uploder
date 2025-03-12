import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Certification {
  certificationName: string;
  issuer: string;
  file: File | null;
}

interface CertificationState {
  certifications: Certification[];
}

const initialState: CertificationState = {
  certifications: [],
};

const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    addCertification: (state, action: PayloadAction<Certification>) => {
      state.certifications.push(action.payload);
    },
  },
});

export const { addCertification } = certificationSlice.actions;
export default certificationSlice.reducer;
