import style from './App.module.scss'
import {saveAs} from 'file-saver'
import {ChangeEvent, useEffect, useState} from 'react'
import {PdfViewer} from './components/PdfViewer.tsx'
import {createSamplePdf} from './functions/createSamplePdf.ts'
import {version, description} from '../package.json'

const pdfFilename = 'Типа это PDF.pdf'

export const App = () => {
	const [document, setDocument] = useState<Uint8Array | null>(null)
	const [timelineTop, setTimelineTop] = useState<number>(50)
	const [yearStart, setYearStart] = useState<number>(1500)
	const [yearEnd, setYearEnd] = useState<number>(1700)
	const [yearStep, setYearStep] = useState<number>(20)

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
		[timelineTop, yearStart, yearEnd, yearStep]
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

	const onYearStartInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		if (isNaN(value)) {
			return
		}
		if (value > 9999 || value < 0) {
			return
		}
		setYearStart(value)
	}

	const onYearEndInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		if (isNaN(value)) {
			return
		}
		if (value > 9999 || value < 0) {
			return
		}
		setYearEnd(value)
	}

	const onYearStepInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		if (isNaN(value)) {
			return
		}
		if (value > 9999 || value < 1) {
			return
		}
		setYearStep(value)
	}

	return (
		<div>
			<div className={style.block}>
				<div>{description}</div>
				<div>Версия: {version}</div>
				<div>Дата сборки: {BUILD_DATE}</div>
				<div>
					Программа сделана на основе статьи <a target='_blank' href='https://dzen.ru/a/ZAT5rR2Spw2jNRfe'>Линия времени (таймлайн) на уроках истории</a>.
				</div>
			</div>
			<div className={style.block}>
				<div>Расстояние от верхнего края листа до линии времени в процентах</div>
				<div>
					<input value={timelineTop} onChange={onTimelineTopInputChange}/>
				</div>
			</div>
			<div className={style.block}>
				<div>Диапазон дат, в годах</div>
				<div>
					<input value={yearStart} onChange={onYearStartInputChange}/>
					<span>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;</span>
					<input value={yearEnd} onChange={onYearEndInputChange}/>
				</div>
			</div>
			<div className={style.block}>
				<div>Шаг сетки, в годах</div>
				<div>
					<input value={yearStep} onChange={onYearStepInputChange}/>
				</div>
			</div>
			<div className={style.block}>
				<button disabled={document === null} onClick={onDownloadButtonClick}>
					Скачать PDF
				</button>
			</div>
			{document && (
				<div className={style.block}>
					<PdfViewer bytes={document}/>
				</div>
			)}
		</div>
	)
}
