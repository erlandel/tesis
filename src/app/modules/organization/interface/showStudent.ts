export interface ShowStudent {
    ciStudent: string;
    lastName: string;
    firstName: string;
    address: string;
    province: string;
    municipality: string;
    skinColor: string;
    gender: string;
    nationality: string;
    preUniversity: string;
    admissionMethod: string;
    motherEducation: string;
    fatherEducation: string;
    motherOccupation: string;
    fatherOccupation: string;
    motherWorkSector: string;
    fatherWorkSector: string;
    indiceAcademico: string;
    procedencia?: string;
    situacion?: string;
    comision?: string; // Atributo adicional
  }