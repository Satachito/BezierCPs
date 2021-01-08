# curve_fit 

## Demo

https://satachito.github.io/BezierCPs/

## Install

```
npm install @satachito/curve_fit --save
```

## Usage

```
<!DOCTYPE html>
<html lang=zxx>
<title>Bezier - LeastSquares</title>

<canvas id=Canvas width=500 height=500 style="border: 1px solid black"></canvas>
<br>
<button id=Clear>CLEAR</button>

<script type=module>

const
C2D = Canvas.getContext( '2d' )
const
Dot = ( x, y ) => C2D.fillRect( x -2, y - 2, 4, 4 )

//import CurveFit from './node_modules/@satachito/curve_fit/index.js'

//	With web-dev-server node resolver.
//	npx web-dev-server --node-resolve --open
//
import CurveFit from '@satachito/curve_fit'

const
$ = []

const
Draw = () => {
	C2D.clearRect( 0, 0, Canvas.width, Canvas.height )
	if ( $.length > 3 ) {
		C2D.beginPath()
		C2D.moveTo( ...$[ 0 ] )
		const xPQ = CurveFit( $.map( _ => _[ 0 ] ) )
		const yPQ = CurveFit( $.map( _ => _[ 1 ] ) )
		C2D.bezierCurveTo( xPQ[ 0 ], yPQ[ 0 ], xPQ[ 1 ], yPQ[ 1 ], ...$[ $.length - 1 ] )
		C2D.strokeStyle = 'red'
		C2D.stroke()
		C2D.fillStyle = 'red'
		Dot( xPQ[ 0 ], yPQ[ 0 ] )
		Dot( xPQ[ 1 ], yPQ[ 1 ] )
	}
	C2D.fillStyle = 'black'
	$.forEach( _ => Dot( _[ 0 ], _[ 1 ] ) )
}

Clear.onclick = () => ( $.length = 0, Draw() )

Canvas.onclick = ev => ( $.push( [ ev.offsetX, ev.offsetY ] ), Draw() )

</script>
```
