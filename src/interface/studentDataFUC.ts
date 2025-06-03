export interface StudentDataFUC {
    identidad_numero: string;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string;
    sexo: 'F' | 'M';
    direccion: string;
    provincia_residencia: string;
    municipio_residencia: string;
    ciudadania: string;
    color_piel?: string;     
}