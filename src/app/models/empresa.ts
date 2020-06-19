export class Empresa {
  IdEmpresa: number;
  RazonSocial: string;
  FechaFundacion: string;
  CantidadEmpleados: number;
};

export const Empresas: Empresa[] = [
  { IdEmpresa: 1,
    RazonSocial: "Claro",
    FechaFundacion: "2000-01-23",
    CantidadEmpleados: 25000
  },
  { IdEmpresa: 2,
    RazonSocial: "Personal",
    FechaFundacion: "1995-11-03",
    CantidadEmpleados: 33000
  },
  { IdEmpresa: 3,
    RazonSocial: "Movistar",
    FechaFundacion: "2007-05-12",
    CantidadEmpleados: 14000
  }
]