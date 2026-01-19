"use client"

import type React from "react"

import type { FlowerAnimationProps } from "@/lib/types"

export function FlowerAnimation({ className = "" }: FlowerAnimationProps) {
  return (
    <div className={`flowers ${className}`}>
      {/* Flores principales del jardín - mejor separadas */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((flowerNum) => (
        <div key={flowerNum} className={`flower flower--${flowerNum}`}>
          <div className={`flower__leafs flower__leafs--${flowerNum}`}>
            {/* Pétalos principales de la flor - mejor distribuidos */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((leafNum) => (
              <div key={leafNum} className={`flower__leaf flower__leaf--${leafNum}`}></div>
            ))}

            {/* Capa adicional de pétalos internos - mejor posicionados */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((innerLeafNum) => (
              <div key={`inner-${innerLeafNum}`} className={`flower__leaf flower__leaf--inner-${innerLeafNum}`}></div>
            ))}

            {/* Centro blanco más pequeño para dar espacio a más pétalos */}
            <div className="flower__white-circle"></div>

            {/* Lucecitas que flotan alrededor */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lightNum) => (
              <div key={lightNum} className={`flower__light flower__light--${lightNum}`}></div>
            ))}
          </div>

          {/* Tallo con más hojas */}
          <div className="flower__line">
            {Array.from({ length: flowerNum <= 3 ? 8 : 6 }, (_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>
      ))}

      {/* Flores pequeñas mejoradas con más pétalos y mejor distribución */}
      {[1, 2, 3, 4, 5, 6, 7].map((smallFlowerNum) => (
        <div key={`small-${smallFlowerNum}`} className={`small-flower small-flower--${smallFlowerNum}`}>
          <div className="small-flower__leafs">
            {/* Más pétalos para las flores pequeñas - mejor distribuidos */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((leafNum) => (
              <div key={leafNum} className={`small-flower__leaf small-flower__leaf--${leafNum}`}></div>
            ))}
            <div className="small-flower__center"></div>
          </div>
          <div className="small-flower__stem"></div>
        </div>
      ))}

      {/* Pétalos cayendo - efecto realista */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((petalNum) => (
        <div key={`falling-petal-${petalNum}`} className={`falling-petal falling-petal--${petalNum}`}>
          <div className="falling-petal__shape"></div>
        </div>
      ))}

      {/* Mariposas animadas */}
      {[1, 2, 3, 4].map((butterflyNum) => (
        <div key={`butterfly-${butterflyNum}`} className={`butterfly butterfly--${butterflyNum}`}>
          <div className="butterfly__body">
            <div className="butterfly__head"></div>
            <div className="butterfly__thorax"></div>
            <div className="butterfly__abdomen"></div>
          </div>
          <div className="butterfly__wings">
            <div className="butterfly__wing butterfly__wing--left-top"></div>
            <div className="butterfly__wing butterfly__wing--left-bottom"></div>
            <div className="butterfly__wing butterfly__wing--right-top"></div>
            <div className="butterfly__wing butterfly__wing--right-bottom"></div>
          </div>
          <div className="butterfly__antennae">
            <div className="butterfly__antenna butterfly__antenna--left"></div>
            <div className="butterfly__antenna butterfly__antenna--right"></div>
          </div>
        </div>
      ))}

      {/* Hierba con hojas pa' que no se vea pelón */}
      {[1, 2].map((grassNum) => (
        <div key={grassNum} className="growing-grass">
          <div className={`flower__grass flower__grass--${grassNum}`}>
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((leafNum) => (
              <div key={leafNum} className={`flower__grass__leaf flower__grass__leaf--${leafNum}`}></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>
      ))}

      {/* Hierba de la derecha */}
      {[2].map((rightNum) => (
        <div key={rightNum} className="grow-ans" style={{ "--d": `${2.4 + rightNum * 0.4}s` } as React.CSSProperties}>
          <div className={`flower__g-right flower__g-right--${rightNum}`}></div>
        </div>
      ))}

      {/* Hierba del frente */}
      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-front">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((wrapperNum) => (
            <div
              key={wrapperNum}
              className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${wrapperNum}`}
            >
              <div className="flower__g-front__leaf"></div>
            </div>
          ))}
          <div className="flower__g-front__line"></div>
        </div>
      </div>

      {/* Hierba del frente derecha */}
      <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((leafNum) => (
            <div key={leafNum} className={`flower__g-fr__leaf flower__g-fr__leaf--${leafNum}`}></div>
          ))}
        </div>
      </div>

      {/* Hierba alta pa' llenar el fondo */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((longNum) => (
        <div key={longNum} className={`long-g long-g--${longNum}`}>
          {[0, 1, 2, 3].map((leafNum) => (
            <div
              key={leafNum}
              className="grow-ans"
              style={
                {
                  "--d": `${3 + longNum * 0.2 + leafNum * 0.2}s`,
                } as React.CSSProperties
              }
            >
              <div className={`leaf leaf--${leafNum}`}></div>
            </div>
          ))}
        </div>
      ))}

      {/* Césped distribuido por todo el campo - mucho más abundante */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(
        (fieldGrassNum) => (
          <div key={`field-grass-${fieldGrassNum}`} className={`field-grass field-grass--${fieldGrassNum}`}>
            <div className="field-grass__blade"></div>
          </div>
        ),
      )}

      {/* Césped largo bien distribuido - más denso */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((longFieldNum) => (
        <div key={`long-field-${longFieldNum}`} className={`long-field-grass long-field-grass--${longFieldNum}`}>
          <div className="long-field-grass__main"></div>
        </div>
      ))}

      {/* Más césped chiquito por todos lados - súper denso */}
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ].map((extraGrassNum) => (
        <div key={`extra-grass-${extraGrassNum}`} className={`extra-small-grass extra-small-grass--${extraGrassNum}`}>
          <div className="extra-small-grass__blade"></div>
        </div>
      ))}

      {/* Césped de fondo adicional para crear más profundidad */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((bgGrassNum) => (
        <div key={`bg-grass-${bgGrassNum}`} className={`background-grass background-grass--${bgGrassNum}`}>
          <div className="background-grass__blade"></div>
        </div>
      ))}
    </div>
  )
}
