import {PageSizes, PDFDocument, rgb} from 'pdf-lib'
import {landscape} from './landscape.ts'

interface ICreateSamplePdfParams {
	/**
	 * Расстояние от верхнего края листа до линии времени в процентах.
	 */
	timelineTop?: number
}

export async function createSamplePdf({timelineTop = 50}: ICreateSamplePdfParams = {}) {
	const pdfDoc = await PDFDocument.create()
	const page = pdfDoc.addPage(landscape(PageSizes.A4))
	const {width, height} = page.getSize()
	const offsetRatioY = (100 - timelineTop) / 100
	page.drawLine({
		start: {x: 0, y: height * offsetRatioY},
		end: {x: width, y: height * offsetRatioY},
		thickness: 2,
		color: rgb(0, 0, 0),
		opacity: 1,
	})
	return pdfDoc.save()
}