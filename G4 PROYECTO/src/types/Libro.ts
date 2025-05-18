export interface Libro {
  id: string;
  titulo: string;
  id_autor: string;
  autor_nombre?: string;
  id_editorial?: string;
  id_categoria?: string;
  id_ubicacion?: string;
  fecha_publicacion?: string;
  isbn?: string;
}