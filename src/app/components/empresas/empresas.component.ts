import { Component, OnInit } from '@angular/core';
import { Empresa } from "../../models/empresa";
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

  SinBusquedasRealizadas = true;

  // FormFiltro: FormGroup;
  FormReg: FormGroup;

  constructor(
    private empresasService: EmpresasService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.Buscar()
    this.FormReg = this.formBuilder.group({
    IdEmpresa: [0],
    RazonSocial: [""],
    FechaFundacion: [""],
    CantidadEmpleados: [null]
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset(this.FormReg.value);
  }

  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.empresasService
      .get()
      .subscribe((res: Empresa[]) => {
        this.Lista = res;
      });
  }

  BuscarPorId(emp, AccionABMC) {
    window.scroll(0, 0);
 
    this.empresasService.getById(emp.IdEmpresa).subscribe((res: any) => {
      // hacemos copia para no modificar el array original del mock
      const itemCopy = { ...res }; 

      //formatear fecha de ISO 8061 a string dd/MM/yyyy
      var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("-");
      itemCopy.FechaFundacion = arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0];

      this.FormReg.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(emp) {
    this.BuscarPorId(emp, "C");
  }

  Modificar(emp) {
    this.BuscarPorId(emp, "M");
  }

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
        this.Buscar();
      });
    } else {
      // modificar put
      this.empresasService.put(itemCopy.IdEmpresa, itemCopy).subscribe((res: any) => {
          this.Volver();
          alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }

  Volver() {
    this.AccionABMC = "L";
  }

  Eliminar(e){
    this.empresasService.delete(e.IdEmpresa).subscribe((res: any) => {
      alert('Registro eliminado correctamente.');
      this.Buscar();
    });
  }

}