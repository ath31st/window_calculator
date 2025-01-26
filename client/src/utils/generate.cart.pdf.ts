import theme from '@/app/_theme/theme';
import { CartItem } from '@/types/models';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.vfs;

const getFormattedDateForFileName = () => {
  const currentDate = new Date();
  return `${currentDate.getDate().toString().padStart(2, '0')}_${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}_${currentDate.getFullYear()}_${currentDate
    .getHours()
    .toString()
    .padStart(2, '0')}_${currentDate.getMinutes().toString().padStart(2, '0')}`;
};

export const generateCartPdf = (cartItems: CartItem[]) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${currentDate.getFullYear()}`;

  const fileName = `заказ_от_${getFormattedDateForFileName()}.pdf`;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'Список товаров и услуг',
        style: 'header',
        alignment: 'center',
      },
      { text: '\n' },
      ...cartItems.flatMap((item, index) => [
        {
          text: `${index + 1}. ${item.name} - ${item.summary} ₽`,
          margin: [0, 5, 0, 5],
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 0.5 },
          ],
        },
      ]),
      { text: '\n' },
      {
        text: `Общая стоимость: ${cartItems.reduce(
          (acc, item) => acc + item.summary,
          0,
        )} ₽`,
        style: 'total',
        margin: [0, 10, 0, 0],
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 1.5 },
          { type: 'line', x1: 0, y1: 3, x2: 500, y2: 3, lineWidth: 1.5 },
        ],
      },
      { text: '\n' },
      {
        text: `Дата составления: ${formattedDate}`,
        alignment: 'right',
        margin: [0, 10, 15, 0],
      },
    ] as Content,
    styles: {
      header: { fontSize: 18, bold: true },
      total: { fontSize: 16, bold: true },
    },
    defaultStyle: {
      font: 'Roboto',
    },
    background: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 595.28,
            h: 841.89,
            color: theme.palette.background.paper,
          },
        ],
      },
    ],
  };

  pdfMake.createPdf(docDefinition).download(fileName);
};

export const generateCartPdfWithNotes = (cartItems: CartItem[]) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${currentDate.getFullYear()}`;

  const fileName = `заказ_с_примечаниями_от_${getFormattedDateForFileName()}.pdf`;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'Список товаров и услуг',
        style: 'header',
        alignment: 'center',
      },
      { text: '\n' },
      ...cartItems.flatMap((item, index) => [
        {
          text: `${index + 1}. ${item.name} - ${item.summary} ₽`,
          margin: [0, 5, 0, 5],
        },
        item.note
          ? {
              text: `Примечание: ${item.note}`,
              style: 'note',
              margin: [0, 5, 0, 10],
            }
          : { text: '' },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 0.5 },
          ],
        },
      ]),
      { text: '\n' },
      {
        text: `Общая стоимость: ${cartItems.reduce(
          (acc, item) => acc + item.summary,
          0,
        )} ₽`,
        style: 'total',
        margin: [0, 10, 0, 0],
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 1.5 },
          { type: 'line', x1: 0, y1: 3, x2: 500, y2: 3, lineWidth: 1.5 },
        ],
      },
      { text: '\n' },
      {
        text: `Дата составления: ${formattedDate}`,
        alignment: 'right',
        margin: [0, 10, 15, 0],
      },
    ] as Content,
    styles: {
      header: { fontSize: 18, bold: true },
      total: { fontSize: 16, bold: true },
      note: { fontSize: 12, color: '#666', italics: true },
    },
    defaultStyle: {
      font: 'Roboto',
    },
    background: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 595.28,
            h: 841.89,
            color: theme.palette.background.paper,
          },
        ],
      },
    ],
  };

  pdfMake.createPdf(docDefinition).download(fileName);
};
