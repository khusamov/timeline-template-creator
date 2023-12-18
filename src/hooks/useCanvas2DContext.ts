import {RefObject} from 'react'

type TResult = [HTMLCanvasElement, CanvasRenderingContext2D]

export function useCanvas2DContext(canvasRef: RefObject<HTMLCanvasElement>): TResult {
	if (!canvasRef.current) {
		throw new Error('Нет ссылки')
	}

	const canvas = canvasRef.current
	const context = canvas.getContext('2d')
	if (!context) {
		throw new Error('Нет контекста')
	}

	return [canvas, context]
}