import type {Metadata} from 'next';
import './globals.css';
import Link from 'next/link';
import { logoBase64 } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Проверить результаты ЕГЭ / Официальный информационный портал единого государственного экзамена (ЕГЭ 2026)',
  description: 'Проверить результаты ЕГЭ',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning className="bg-[#d2d8ee] bg-gradient-to-b from-[#e6eaf6] to-[#d2d8ee] bg-no-repeat bg-fixed min-h-screen text-[14px] font-[Verdana,Arial,Helvetica,sans-serif] text-black m-0 p-0 text-left">
        <div className="mx-auto w-[1000px] min-h-screen relative bg-white shadow-[0_0_30px_rgba(0,0,0,0.3)] pb-[180px] box-border">
          <header className="h-[188px] relative text-left">
            <div className="absolute left-0 right-0 h-[38px] top-0 bg-[#f2f2f2]"></div>
            <div className="absolute left-0 right-0 h-[150px] top-[38px]">
              <Link href="/">
                <div 
                  className="absolute left-[30px] top-[45px] w-[138px] h-[50px] cursor-pointer"
                  style={{ background: `url(${logoBase64}) no-repeat` }}
                ></div>
              </Link>
              <div className="absolute left-[210px] top-[40px] leading-[32px] text-[24px] font-['Calibri',Helvetica,sans-serif]">
                <div className="text-[#949699] uppercase">Официальный информационный портал</div>
                <div className="font-bold uppercase">Единого государственного экзамена</div>
              </div>
            </div>
          </header>

          <main className="px-[32px] pt-[20px] border-t border-[#bebfc1] text-left">
            {children}
          </main>

          <footer className="absolute bottom-0 left-0 right-0 h-[150px] bg-[#f2f2f2] border-t border-[#d5d6d6] text-[12px] text-center pt-[18px] text-[#949699] box-border">
            <div>
              &copy; 2001-<span>2026</span> Федеральная служба по надзору в сфере образования и науки
            </div>
            <div>
              При использовании материалов портала ЕГЭ на внешних Интернет-ресурсах ссылка на <a href="http://obrnadzor.gov.ru/" target="_blank" className="text-[#0071bb] hover:text-[#00436e] text-[12px]">первоисточник</a> обязательна
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
