const
Transpose = _ => _[ 0 ].map( ( __, d ) => _.map( _ => _[ d ] ) )

/*	Points: [ s, p, q, e ] 
	BezierDiff: t => {	const u = 1 - t
			u^3s
		+	3u^2tp
		+	3ut^2q
		+	t^3e
		-	o
	}
	A	: u^3s
	B	: 3u^2t
	C	: 3ut^2
	D	: t^3e
	E	: -o

	BezierDiff			: A + Bp + Cq + D + E

	BezierDiff^2		: A^2 + B^2p^2 + C^2q^2 + D^2 + E^2 + 2ABp + 2ACq + 2AD + 2AE + 2BCpq + 2BDp + 2BEp + 2CDq + 2CEq + 2DE
	(BezierDiff^2)'/p/2	: B^2p + BCq + AB + BD + BE
	(BezierDiff^2)'/q/2	: BCp + C^2q + AC + CD + CE

	(BezierDiff^2)'/p/2	: 9u^4t^2p + 9u^3t^3q + 3u^5ts + 3u^2t^4e - 3u^2to
						: (3u^2t)( 3u^2tp + 3ut^2q + u^3s + t^3e - o )

	(BezierDiff^2)'/q/2	: 9u^3t^3p + 9u^2t^4q + 3u^4t^2s + 3ut^5e - 3ut^2o
						: (3ut^2)( 3u^2tp + 3ut^2q + u^3s + t^3e - o )

*/
export const
FitBezier1D = _ => {
	const l = _.length - 1
	const s = _[ 0 ]
	const e = _[ l ]

	let	pp = 0, pq = 0, qp = 0, qq = 0, p = 0, q = 0
	for ( let $ = 1; $ < l; $++ ) {	//	Bypass first and last element, because 't' or 'u' will be zero.
		const t = $ / l
		const u = 1 - t
		const P = 3 * u * u * t
		const Q = 3 * u * t * t
		pp += P * P
		qq += Q * Q
		const PQ = P * Q
		pq += PQ
		qp += PQ
		const R = _[ $ ] - u * u * u * s - t * t * t * e
		p += P * R
		q += Q * R
	}

	const dm = pp * qq - pq * qp

	return [
		+ p * qq / dm - q * pq / dm
	,	- p * qp / dm + q * pp / dm
	]
}

export const
FitBezier = _ => Transpose( Transpose( _ ).map( _ => FitBezier1D( _ ) ) )

/*	Points: [ s, ?, e ]
	ConicDiff: t => {	const u = 1 - t
			u^2s
		+	2ut?
		+	t^2e
		-	$		// 実際の値
	}

	A	: u^2s
	B	: 2ut
	C	: t^2e
	D	: -$
	ConicDiff			: A + B? + C + D

	ConnicDiff^2		: A^2 + B^2?^2 + C^2 + D^2 + 2AB? + 2AC + 2AD + 2BC? + 2BD? + 2CD
	(ConnicDiff^2)'/2	: B^2? + AB + BC + BD
						: 4u^2t^2? + 2u^3ts + 2ut^3e - 2ut$
						: (2ut)( 2ut? + u^2s + t^2e - $ )
	2ut? + u^2s + t^2e - $ = 0
	2? = ( $ / ut ) - ( us / t ) - ( te / u )

*/

export const
FitConic1D = _ => {
	const l = _.length - 1
	const s = _[ 0 ]
	const e = _[ l ]

	let C = 0
	let S = 0
	let E = 0
	for ( let $ = 1; $ < l; $++ ) { //	Bypass first and last element, because 't' or 'u' will be zero.
		const t = $ / l
		const u = 1 - t
		C += _[ $ ] / ( u * t )
		S += u * s / t
		E += t * e / u
	}

	return ( C - S - E ) / 2 / ( l - 1 )
}

export const
FitConic = _ => Transpose( _ ).map( _ => FitConic1D( _ ) )
