import {PageSizes, PDFDocument, rgb} from 'pdf-lib'

export async function createSamplePdf() {
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
	return pdfDoc.save()
}