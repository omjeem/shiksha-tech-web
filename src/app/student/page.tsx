"use client"
import { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';


export default function StudentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  async function parseFile (file: File) {
    const workbook : any = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);
  
    const worksheet = workbook.getWorksheet(1);
    const rows: any[] = [];
  
    worksheet.eachRow((row : any, rowNumber : any) => {
      if (rowNumber === 1) return; // skip headers
      const [srNo, name, rollNo, email, dob, admissionClass, admissionSection, admissionDate] = row.values.slice(1);
      rows.push({
        srNo,
        name,
        rollNo,
        email,
        dob: dob ? new Date(dob) : undefined,
        admissionClass,
        admissionSection,
        admissionDate: admissionDate ? new Date(admissionDate) : undefined,
      });
    });
  
    console.log('Parsed:', rows);
    return rows;
  }

  useEffect(()=>{
    if(selectedFile)parseFile(selectedFile);
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
    }
  };

  return (
    <div>
      <h2>Student Page</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {selectedFile && (
        <p>
          Selected File: <strong>{selectedFile.name}</strong>
        </p>
      )}
    </div>
  );
}
