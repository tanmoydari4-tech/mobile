import React from 'react';

interface BrandBarProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
}

export const BrandBar: React.FC<BrandBarProps> = ({ selectedBrand, onSelectBrand }) => {
  const brands = [
    { name: 'All Brands', value: 'all' },
    { name: 'Apple', value: 'Apple' },
    { name: 'Samsung', value: 'Samsung' },
    { name: 'OnePlus', value: 'OnePlus' },
    { name: 'Xiaomi', value: 'Xiaomi' },
    { name: 'Realme', value: 'Realme' },
    { name: 'Vivo', value: 'Vivo' },
    { name: 'Motorola', value: 'Motorola' },
    { name: 'iQOO', value: 'iQOO' },
    { name: 'SmartZone Gear', value: 'SmartZone' }
  ];

  return (
    <section className="bg-white py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-900">
              Shop by Brand
            </h2>
            <p className="text-xs text-slate-500">Explore authentic devices from authorized manufacturers</p>
          </div>
          {selectedBrand !== 'all' && (
            <button
              onClick={() => onSelectBrand('all')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {brands.map(brand => {
            const isSelected = selectedBrand === brand.value;
            return (
              <button
                key={brand.value}
                onClick={() => onSelectBrand(brand.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
                }`}
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
