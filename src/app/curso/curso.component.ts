import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {

  //CONSTRUTOR
  constructor(private cursoService: CursoService) { }

  //OBJETO DA CLASSE CURSO
  curso = new Curso();


  //VETOR DE CURSOS
  vetor: Curso[] = [];

  ngOnInit() {
    //NO INÍCIO, LISTAR CURSOS
    this.selecao();
  }

  //SELEÇÃO
  selecao() {
    this.curso.nomeCurso = undefined;
    this.curso.valorCurso = undefined;
    this.cursoService.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //CADASTRAR
  cadastro() {
    this.cursoService.cadastrarCurso(this.curso).subscribe(
      (novoCurso: Curso) => {
        this.vetor.push(novoCurso);
        this.selecao();
      }
    )
  }

  //EXCLUIR
  excluir() {
    this.cursoService.excluirCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;
        this.selecao();
      }
    )
  }

  //ALTERAR
  alterar() {
    this.cursoService.updateCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;
        this.selecao();
      }
    )
  }

  selecaoUnica(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }
}
