import { createContext } from "react";

// 사용자 위치, 병원정보, 병원코드정보 context
const DWContext = createContext();
DWContext.displayName = 'DWContext';

export default DWContext;