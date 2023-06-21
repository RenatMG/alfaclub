// @ts-nocheck

import styles from './Excel.module.scss';
import { FC } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const ExcelPage: FC = () => {
    const save = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('data');
        // worksheet.views = [{
        //     state: 'frozen', xSplit: 1, ySplit: 7
        // }];

        worksheet.columns = [
            { header: 'pid', key: 'pid', width: 10 },
            { header: 'name', key: 'name', width: 10 },
            { header: 'cfo', key: 'cfo', width: 10, outlineLevel: 1, collapsed: true },
        ];

        // worksheet.getColumn(3).protection = {
        //     locked: false
        // };

        const rows = [
            { pid: 65464, name: 'foo', cfo: 'A' },
            // { pid: 23423, name: 'foo 2', cfo: 'A' },
            // { pid: 66344, name: 'foo 3', cfo: 'A' },
            // { pid: 34333, name: 'foo 4', cfo: 'A' },
        ];
        worksheet.insertRow(1);
        const firstRow = [
            '','','','',
            'Всего сотрудников'
        ];
        worksheet.insertRow(2, firstRow)
        worksheet.mergeCells('A1:AF1');
        worksheet.addRows(rows);
        // await worksheet.protect('', {
        //     formatColumns: true
        // });

        // worksheet.getCell('A2').protection = {
        //     locked: false,
        // }
        // worksheet.getCell('C3').protection = {
        //     locked: false,
        // }

        worksheet.getColumn(3).eachCell({ includeEmpty: true }, (cell, rowNumber) => {
            console.log('rowNumber', rowNumber);
            cell.protection = {
                locked: false
            };
            // cell.names =  ['A','B','C']
            cell.dataValidation = {
                type: 'list',
                allowBlank: true,
                //  formulae: ['"' + ASSESSING_PREVIOUS_PERIOD_OPTIONS.join(",") + '"'],
                formulae: ['"A,B,C"'],
            };
        });


        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: fileType });
        saveAs(blob, 'test' + fileExtension);
        // await workbook.xlsx.writeFile(fileName + fileExtension)

        // const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        // const excelBuffer = await XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
        // const data = await new Blob([excelBuffer], { type: fileType });
    };

    return (
        <div className={styles.wrapper}>
            <button onClick={save}>GO</button>
        </div>
    );
};

export default ExcelPage;
/*

import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';
import ExcelJS from 'exceljs'
import { ASSESSING_PREVIOUS_PERIOD_OPTIONS } from '../../../config';
import { ISetting } from '../../models/ISettings';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const writeToCSV = async (fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
    // worksheet.views = [{
    //     state: 'frozen', xSplit: 1, ySplit: 7
    // }];

    worksheet.columns = [
        { header: 'pid', key: 'pid', width: 10 },
        { header: 'name', key: 'name', width: 10 },
        { header: 'cfo', key: 'cfo', width: 10, outlineLevel: 1 },
    ];

    // worksheet.getColumn(3).protection = {
    //     locked: false
    // };

    const rows = [
        { pid: 65464, name: 'foo', cfo: 'A' },
        // { pid: 23423, name: 'foo 2', cfo: 'A' },
        // { pid: 66344, name: 'foo 3', cfo: 'A' },
        // { pid: 34333, name: 'foo 4', cfo: 'A' },
    ]
    worksheet.addRows(rows);
    // await worksheet.protect('', {
    //     formatColumns: true
    // });

    // worksheet.getCell('A2').protection = {
    //     locked: false,
    // }
    // worksheet.getCell('C3').protection = {
    //     locked: false,
    // }

    worksheet.getColumn(3).eachCell({includeEmpty: true}, (cell, rowNumber) => {
        console.log('rowNumber', rowNumber)
        cell.protection = {
            locked: false
        }
        // cell.names =  ['A','B','C']
        cell.dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: ['"' + ASSESSING_PREVIOUS_PERIOD_OPTIONS.join(",") + '"'],
            // formulae: ['"A,B,C"'],
        }
    })


    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: fileType })

    // await workbook.xlsx.writeFile(fileName + fileExtension)

    // const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    // const excelBuffer = await XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    // const data = await new Blob([excelBuffer], { type: fileType });
    saveAs(blob, fileName + fileExtension);
};

* */