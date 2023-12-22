import {PageSizes, PDFDocument, rgb, StandardFonts} from 'pdf-lib'
import {landscape} from './landscape.ts'

interface ICreateSamplePdfParams {
	/**
	 * Расстояние от верхнего края листа до линии времени в процентах.
	 */
	timelineTop?: number

	yearStart?: number
	yearEnd?: number
	yearStep?: number
}

export async function createSamplePdf(params: ICreateSamplePdfParams = {}) {
	const {
		timelineTop = 50,
		yearStart = 1500,
		yearEnd = 1700,
		yearStep = 20
	} = params

	if (yearStep <= 0) {
		throw new Error('Шаг сетки не может быть нуль или меньше нуля')
	}

	const pdfDoc = await PDFDocument.create()
	const defaultFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
	const page = pdfDoc.addPage(landscape(PageSizes.A4))
	page.setFont(defaultFont)
	const {width, height} = page.getSize()

	const padding = 60

	const offsetX = padding
	// const offsetY = 0

	const contentWidth = width - padding * 2
	const contentHeight = height

	const offsetRatioY = (100 - timelineTop) / 100

	const lineLength = 10
	const scaleX = contentWidth / (yearEnd - yearStart)

	for (let year = yearStart; year <= yearEnd; year += yearStep) {
		const x = (year - yearStart) * scaleX
		page.drawLine({
			start: {x: x + offsetX, y: 10},
			end: {x: x + offsetX, y: contentHeight -10},
			dashArray: [5, 5],
			opacity: .5
		})
	}

	page.drawRectangle({
		color: rgb(1, 1, 1),
		x: 0,
		y: height * offsetRatioY - 10,
		width: width,
		height: 40
	})

	page.drawLine({
		start: {x: offsetX, y: height * offsetRatioY},
		end: {x: width - padding * 2 + offsetX, y: height * offsetRatioY},
		thickness: 1,
		color: rgb(0, 0, 0),
		opacity: 1,
	})

	for (let year = yearStart; year <= yearEnd; year += yearStep) {
		const x = (year - yearStart) * scaleX
		page.drawLine({
			start: {x: x + offsetX, y: contentHeight * offsetRatioY},
			end: {x: x + offsetX, y: contentHeight * offsetRatioY + lineLength}
		})

		const fontSize = 12
		const text = String(year)
		const textOffsetX = -defaultFont.widthOfTextAtSize(text, fontSize) / 2
		const textOffsetY = 15

		page.drawText(text, {
			x: x + offsetX + textOffsetX,
			y: contentHeight * offsetRatioY + textOffsetY,
			size: fontSize
		})
	}

	return pdfDoc.save()
}