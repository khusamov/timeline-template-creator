import './App.scss'
import {saveAs} from 'file-saver'
import {ChangeEvent, useEffect, useState} from 'react'
import {PdfViewer} from './components/PdfViewer.tsx'
import {createSamplePdf} from './functions/createSamplePdf.ts'

const pdfFilename = 'Типа это PDF.pdf'

export const App = () => {
	const [document, setDocument] = useState<Uint8Array | null>(null)
	const [timelineTop, setTimelineTop] = useState<number>(50)

	useEffect(
		() => {
			let isCanceled = false
			createSamplePdf({timelineTop, yearStart, yearEnd, yearStep}).then(
				pdfBytes => {
					if (isCanceled) {
						return
					}
					setDocument(pdfBytes)
				}
			)
			return () => {
				isCanceled = true
			}
		},
		[timelineTop]
	)

	const onDownloadButtonClick = () => {
		if (document) {
			saveAs(new Blob([document]), pdfFilename)
		}
	}

	const onTimelineTopInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		if (isNaN(value)) {
			return
		}
		if (value > 100 || value < 0) {
			return
		}
		setTimelineTop(value)
	}

	return (
		<div>
			<div>
				Timeline template creator
			</div>
			<div>
				<div>Расстояние от верхнего края листа до линии времени в процентах</div>
				<div>
					<input value={timelineTop} onChange={onTimelineTopInputChange}/>
				</div>
			</div>
			<div>
				<button disabled={document === null} onClick={onDownloadButtonClick}>
					Скачать PDF
				</button>
			</div>
			{
				document && <PdfViewer bytes={document}/>
			}
		</div>
	)
}
