import React from 'react';
import type { BingoCard as BingoCardType } from '../types';

interface Props {
  card: BingoCardType;
}

export function BingoCard({ card }: Props) {
  return (
    <div className="w-[650px] bg-white rounded-lg shadow-lg p-4 print:shadow-none">
      <div className="grid grid-cols-5 gap-2 aspect-square">
        {/* BINGO Header */}
        {['B', 'I', 'N', 'G', 'O'].map((letter) => (
          <div
            key={letter}
            style={{ color: card.themeColor }}
            className="flex items-center justify-center font-bold text-4xl"
          >
            {letter}
          </div>
        ))}
        
        {/* Bingo Squares */}
        {card.squares.map((square, index) => (
          <div
            key={index}
            style={{ borderColor: card.themeColor }}
            className="relative border-2 rounded aspect-square flex items-center justify-center p-2"
          >
            {index === 12 && card.freeSpaceImage ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full print:relative">
                  <img
                    src={card.freeSpaceImage}
                    alt="Free Space"
                    className="w-full h-full object-cover rounded-sm"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
                <div 
                  className="absolute inset-0 flex items-center justify-center print:relative print:inset-auto"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <span className="font-bold text-white z-10">FREE</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-center text-sm font-medium leading-tight">
                  {square}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}