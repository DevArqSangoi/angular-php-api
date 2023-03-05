import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Curso } from './curso';

interface RespostaDb {
  cursos: Curso[];
}

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  //URL
  url = "http://localhost/api/php/";

  //VETOR
  cursos: Curso[] = [];

  constructor(private http: HttpClient) { }

  //OBTER TODOS OS CURSOS
  obterCursos(): Observable<Curso[]> {
    return this.http.get<RespostaDb>(this.url + "listar.php").pipe(
      map((res) => {
        return res.cursos.filter(curso => curso.idCurso !== undefined && curso.nomeCurso !== undefined && curso.valorCurso !== undefined);
      })
    )
  }

  //CADASTAR CURSO
  cadastrarCurso(c: Curso): Observable<Curso> {
    return this.http.post<RespostaDb>(this.url + "cadastrar.php", { cursos: c }).pipe(
      map((res) => res.cursos[0])
    );
  }


  //EXCLUIR CURSO
  excluirCurso(c: Curso): Observable<Curso[]> {
    return this.http.post<RespostaDb>(this.url + "excluir.php", { cursos: c }).pipe(
      map((res) => {
        const filtro = this.cursos.filter((curso) => {
          return +curso['idCurso']! !== +c.idCurso!;
        });
        return this.cursos = filtro;
      }));
  }

  //ATUALIZAR CURSO
  updateCurso(c: Curso): Observable<Curso[]> {
    return this.http.put<RespostaDb>(this.url + "alterar.php", { cursos: c })
      .pipe(map((res) => {
        const cursoAlterado = this.cursos.findIndex((curso) => {
          return +curso['idCurso']! === +['c.idCurso'];
        });
        if (cursoAlterado !== -1) {
          this.cursos[cursoAlterado]['nomeCurso'] = c['nomeCurso']
          this.cursos[cursoAlterado]['valorCurso'] = c['valorCurso']
        }
        return this.cursos;
      }));
  }
}