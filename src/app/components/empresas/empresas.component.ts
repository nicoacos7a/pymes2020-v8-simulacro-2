import { Component, OnInit } from '@angular/core';
import { Empresa } from "../../models/empresa";
import { MockEmpresasService } from "../../services/mock-empresas.service";
import { EmpresasService } from "../../services/empresas.service";

import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";

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

  SinBusquedasRealizadas = true;

  Pagina = 1; // inicia pagina 1

  // FormFiltro: FormGroup;
  FormReg: FormGroup;

  constructor(
    // private empresasService: MockEmpresasService
    private empresasService: EmpresasService,

    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.FormReg = this.formBuilder.group({
    IdEmpresa: [null],
    RazonSocial: [null],
    FechaFundacion: [null],
    CantidadEmpleados: [null]
    });

     this.GetEmpresas();
  }

  GetEmpresas() {
        //  this.empresasService.get(' ', this.Pagina).subscribe((res: Empresa[]) => {
       this.empresasService.get(' ').subscribe((res: Empresa[]) => {
       this.Lista = res;
     });
  }

  Agregar() {
    this.AccionABMC = "A";
    // this.FormReg.reset({Activo: true});
    this.FormReg.reset();
  }

  // Buscar segun los filtros, establecidos en FormReg
  // Buscar() {
  //   this.empresasService
  //     .get(' ')
  //     .subscribe((res: any) => {
  //       this.Lista = res.Lista;
  //       this.RegistrosTotal = res.RegistrosTotal;
  //     });
  //   this.SinBusquedasRealizadas = false;
  // }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll
 
    this.empresasService.getById(Dto.IdEmpresa).subscribe((res: any) => {
      // hacemos copia para no modificar el array original del mock
      const itemCopy = { ...res }; 

      //formatear fecha de ISO 8061 a string dd/MM/yyyy
      var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("-");
      itemCopy.FechaFundacion = arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0];

      this.FormReg.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, "C");
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    this.BuscarPorId(Dto, "M");
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
 
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaFundacion = 
          new Date(
            arrFecha[2],
            arrFecha[1] - 1,
            arrFecha[0]
          ).toISOString();
 
    // agregar post
    if (itemCopy.IdEmpresa == 0 || itemCopy.IdEmpresa == null) {
      this.empresasService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        alert('Registro agregado correctamente.');
        //this.Buscar();
      });
    } else {
      // modificar put
      this.empresasService
        .put(itemCopy.IdEmpresa, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          alert('Registro modificado correctamente.');
          //this.Buscar();
        });
    }
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

}