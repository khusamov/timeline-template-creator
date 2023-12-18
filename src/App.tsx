import './App.scss'
import {PageSizes, PDFDocument, rgb} from 'pdf-lib'
import {saveAs} from 'file-saver'

const pdfDoc = await PDFDocument.create()
const page = pdfDoc.addPage(PageSizes.A4.reverse() as [number, number])

const {width, height} = page.getSize()

page.drawLine({
   start: {x: 0, y: height / 2},
   end: {x: width, y: height / 2},
   thickness: 2,
   color: rgb(0, 0, 0),
   opacity: 1,
})

const pdfBytes = await pdfDoc.save()

export const App = () => {
   const onDownloadButtonClick = () => {
      saveAs(
         new Blob([pdfBytes]),
         'Типа это PDF.pdf'
      )
   }
   return (
      <div>
         <div>Timeline template creator</div>
         <button onClick={onDownloadButtonClick}>Скачать PDF</button>
      </div>
   )
}
