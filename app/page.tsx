import { exams } from '@/lib/data';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <div className="float-right text-[22px] leading-tight">
        <span className="text-black font-normal">Кино А.В.</span>
        {' '}
        <a href="#" id="logout" className="text-[24px] text-[#0071bb] hover:text-[#00436e] ml-1">Выход</a>
      </div>
      
      <h3 className="font-['Calibri',Helvetica,sans-serif] text-[22px] font-bold mt-0 mb-[22px]">Ваши результаты ЕГЭ</h3>
      
      <div className="mb-[20px]">
        <a href="https://obrnadzor.gov.ru/gia/gia-11/raspisanie-gia-11/" target="_blank" className="text-[#0071bb] hover:text-[#00436e] text-[12px]">
          График публикации результатов экзаменов
        </a>
      </div>

      <div className="relative overflow-auto w-full min-h-[100px] text-center mb-[20px]">
        <table className="w-full table-fixed border-collapse border border-[#C2C2C2] text-[13px]">
          <thead>
            <tr>
              <th className="w-[110px] border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Дата экзамена</th>
              <th className="border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Предмет</th>
              <th className="w-[110px] border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Тестовый балл</th>
              <th className="w-[110px] border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Минимальный балл</th>
              <th className="border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Статус экзамена</th>
              <th className="w-[110px] border border-[#C2C2C2] text-center align-middle font-bold p-[8px_11px] bg-[#dae1f7]">Апелляция</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index} className={`hover:bg-[#dadada] ${index % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-white'}`}>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">{exam.date}</td>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">
                  {exam.hasLink ? (
                    <Link href={`/exam/${exam.id}`} className="text-[#0071bb] hover:text-[#00436e] cursor-pointer">
                      {exam.subject}
                    </Link>
                  ) : (
                    <span>{exam.subject}</span>
                  )}
                </td>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">
                  {exam.mark && (
                    <span className={`font-bold ${exam.mark === 'зачёт' || (typeof exam.mark === 'number' && (!exam.minMark || exam.mark >= exam.minMark)) ? 'text-[green]' : 'text-[red]'}`}>{exam.mark}</span>
                  )}
                </td>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">
                  {exam.minMark || ''}
                </td>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">
                  {exam.status}
                </td>
                <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">
                  {exam.appeal || ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[red] text-[11px] leading-[1.5] m-0 mb-[5px]">
        Внимание!
      </p>
      <p className="mb-[15px] text-[11px] leading-[1.5]">
        В случае если:<br />
        — напротив предмета установлен статус «Результат скрыт»<br />
        — напротив предмета установлен статус «Экзамен обработан» и при этом значение тестового балла пустое <br />
        Вам необходимо обратиться в РЦОИ Вашего региона для получения результатов.
      </p>
      <p className="text-[red] text-[11px] leading-[1.5] m-0">
        Обращаем Ваше внимание, что результаты ЕГЭ могут быть изменены в&nbsp;связи с&nbsp;проведением процедур апелляции и/или&nbsp;перепроверок результатов на&nbsp;региональном и&nbsp;федеральном уровнях. Рекомендуем осуществлять периодические повторные проверки Ваших результатов ЕГЭ.
      </p>
    </div>
  );
}
