import { CartItem } from '@/types/models';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.vfs;

export const generateCartPdf = (cartItems: CartItem[]) => {
  const docDefinition = {
    content: [
      {
        text: 'Список товаров и услуг',
        style: 'header',
        alignment: 'center',
      },
      { text: '\n' },
      ...cartItems.flatMap((item, index) => [
        {
          text: `${index + 1}. ${item.name} - ${item.summary} руб.`,
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
        )} руб.`,
        style: 'total',
        margin: [0, 10, 0, 0],
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 1.5 },
          { type: 'line', x1: 0, y1: 3, x2: 500, y2: 3, lineWidth: 1.5 },
        ],
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      total: { fontSize: 16, bold: true },
    },
    defaultStyle: {
      font: 'Roboto',
    },
  } as TDocumentDefinitions;

  pdfMake.createPdf(docDefinition).download('cart.pdf');
};
