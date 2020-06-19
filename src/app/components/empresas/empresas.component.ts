import { Component, OnInit } from '@angular/core';
import { Empresa } from "../../models/empresa";
import { MockEmpresasService } from "../../services/mock-empresas.service";
import { EmpresasService } from "../../services/empresas.service";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  Titulo = "Empresas";

  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };

  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)

  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };
  
  Lista: Empresa[] = [];

  RegistrosTotal: number;

  Empresas: Empresa[] = [];

  SinBusquedasRealizadas = true;

  Pagina = 1; // inicia pagina 1

  constructor(
    // private empresasService: MockEmpresasService
    private empresasService: EmpresasService
  ) {}

  ngOnInit() {
     this.GetEmpresas();
  }

  GetEmpresas() {
        //  this.empresasService.get(' ', this.Pagina).subscribe((res: Empresa[]) => {
       this.empresasService.get().subscribe((res: Empresa[]) => {
       this.Empresas = res;
     });
  }

  // Agregar() {
  //   this.AccionABMC = "A";
  // }

  // // Buscar segun los filtros, establecidos en FormReg
  // Buscar() {
  //    this.empresasService.get(' ', this.Pagina).subscribe((res: any) => {
  //       this.Lista = res.Lista;
  //       this.RegistrosTotal = res.RegistrosTotal;
  //     });
  //    this.SinBusquedasRealizadas = false;
  // }

  // // Obtengo un registro especifico según el Id
  // BuscarPorId(Dto, AccionABMC) {
  //   window.scroll(0, 0); // ir al incio del scroll
  //   this.AccionABMC = AccionABMC;
  // }

  // Consultar(Dto) {
  //   this.BuscarPorId(Dto, "C");
  // }

  // // comienza la modificacion, luego la confirma con el metodo Grabar
  // Modificar(Dto) {
  //   this.BuscarPorId(Dto, "M");
  // }

  // // grabar tanto altas como modificaciones
  // Grabar() {
  //   alert("Registro Grabado!");
  //   this.Volver();
  // }

  // // Volver desde Agregar/Modificar
  // Volver() {
  //   this.AccionABMC = "L";
  // }

}