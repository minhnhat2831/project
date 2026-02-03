export const mockIsins = [
  {
    isin: "ISIN1",
    securityName: "Security 1",
    currency: "EUR",
  },
  {
    isin: "ISIN2",
    securityName: "Security 2",
    currency: "USD",
  },
];

export const mockIsinHolding: Record<string, any> = {
  ISIN1: [
    {
      clientName: "Org A",
      subOrganizationName: "Sub Org A1",
      effectiveValueAmt: "100000.00",
      organizationNum : "USNCG000954",
      subOrganizationNum : "VNG-0S8C6S2WV3X2A",
      subAccountNum : "AXC8541"
    },
    {
      clientName: "Org A",
      subOrganizationName: "Sub Org A2",
      effectiveValueAmt: "150000.00",
      organizationNum : "PAOMC000321",
      subOrganizationNum : "SRG-0F648HDFY8832",
      subAccountNum : "TAS9V52"
    },
    {
      clientName: "Org A",
      subOrganizationName: "Sub Org A3",
      effectiveValueAmt: "200000.00",
      organizationNum : "SFOVI000529",
      subOrganizationNum : "PSM-8D5S3A6Z9S41QW",
      subAccountNum : "QW962XA"
    },
  ],
  ISIN2: [
    {
      clientName: "Org B",
      subOrganizationName: "Sub Org B1",
      effectiveValueAmt: "250000.00",
      organizationNum : "HSGCB000147",
      subOrganizationNum : "LMS-00A23ZSW84A6ZZ",
      subAccountNum : "95SQ2SX"
    },
    {
      clientName: "Org B",
      subOrganizationName: "Sub Org B2",
      effectiveValueAmt: "300000.00",
      organizationNum : "QOSMC000542",
      subOrganizationNum : "WWC-AX2C3OI6AS9CML",
      subAccountNum : "PLM245S"
    },
  ],
};