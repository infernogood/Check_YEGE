import { examDetails } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = examDetails[id as keyof typeof examDetails];

  if (!exam) {
    notFound();
  }

  const hasExtended = 'extendedAnswers' in exam;
  const isPass = exam.testScore === 'зачёт' || (typeof exam.testScore === 'number' && (!exam.minScore || exam.testScore >= exam.minScore));
  const shortYourScore = exam.answers.reduce((acc, cur) => acc + cur.yourScore, 0);
  const shortMaxScore = exam.answers.reduce((acc, cur) => acc + cur.maxScore, 0);

  const extendedYourScore = hasExtended ? (exam as any).extendedAnswers.reduce((acc: any, cur: any) => acc + cur.yourScore, 0) : 0;
  const extendedMaxScore = hasExtended ? (exam as any).extendedAnswers.reduce((acc: any, cur: any) => acc + cur.maxScore, 0) : 0;

  const totalPrimaryScore = shortYourScore + extendedYourScore;

  return (
    <div>
      <div className="float-right text-[22px] leading-tight flex flex-col items-end">
        <div>
          <span className="text-black font-normal">Кино А.В.</span>
          {' '}
          <a href="#" className="text-[24px] text-[#0071bb] hover:text-[#00436e] ml-1">Выход</a>
        </div>
        <Link href="/" className="text-[#0071bb] hover:text-[#00436e] text-[12px] mt-1">
          Все экзамены
        </Link>
      </div>
      
      <h3 className="font-['Calibri',Helvetica,sans-serif] text-[22px] font-bold mt-0 mb-[22px]">Результаты экзамена</h3>
      
      <div className="mb-[15px]">
        <div className="font-bold text-[14px] mb-[10px]">{exam.subject} {exam.date}</div>
        
        <div className="text-[14px] leading-relaxed">
          Ваш первичный балл: {totalPrimaryScore}<br />
          Ваш тестовый балл: <span className={`font-bold ${isPass ? 'text-[green]' : 'text-[red]'}`}>{exam.testScore}</span><br />
          {exam.minScore && (
            <>Минимальный проходной (тестовый) балл: {exam.minScore}<br /></>
          )}
        </div>
      </div>

      <div className="mb-[15px]">
        <div className="font-bold text-[14px] mb-[10px]">Бланки ответов</div>
        <div className="flex flex-col gap-1">
          {exam.forms.map((form, index) => (
            <a href="#" key={index} className="text-[#0071bb] hover:text-[#00436e] text-[12px]">
              {form}
            </a>
          ))}
        </div>
      </div>

      <div className="font-bold text-[14px] mb-[10px]">Ответы на задания</div>

      <div className="w-full text-[12px] bg-[#fff0f0] text-[#C31612] p-[15px] leading-[1.5] border border-[#ef504c] box-border mb-[20px] text-left">
        Подробную информацию по критериям оценивания смотрите в спецификации КИМ на <a href="https://fipi.ru/" target="_blank" className="text-[#0071bb] hover:text-[#00436e]">сайте ФИПИ</a>
      </div>

      {exam.answers.length > 0 && (
        <div className="relative overflow-auto w-full min-h-[100px] text-center mb-[20px]">
          <table className="w-full table-fixed border-collapse border border-[#C2C2C2] text-[13px]">
            <thead>
              <tr>
                <th colSpan={5} className="border border-[#C2C2C2] text-center align-middle p-[8px_11px] bg-[#dae1f7] font-normal">
                  <strong>Результаты выполнения заданий с кратким ответом</strong>
                </th>
              </tr>
              <tr>
                <th className="w-[60px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">№</th>
                <th className="border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Ваш ответ</th>
                <th className="border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Допустимые символы</th>
                <th className="w-[120px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Ваш балл<span className="text-[red]">*</span></th>
                <th className="w-[160px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Максимальный балл<span className="text-[red]">*</span></th>
              </tr>
            </thead>
            <tbody>
              {exam.answers.map((answer, index) => (
                <tr key={index} className={`hover:bg-[#dadada] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f2f2f2]'}`}>
                  <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">{answer.id}</td>
                  <td className="border border-[#C2C2C2] text-left align-middle p-[11px] text-[13px]">{answer.answer}</td>
                  <td className="border border-[#C2C2C2] text-left align-middle p-[11px] text-[13px]">{answer.allowed}</td>
                  <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px] font-bold">{answer.yourScore}</td>
                  <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px] font-bold">{answer.maxScore}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#dae1f7] font-bold">
                <td colSpan={3} className="border border-[#C2C2C2] text-right p-[11px] text-[13px] font-bold">Итого</td>
                <td className="border border-[#C2C2C2] text-center p-[11px] text-[13px] font-bold">{shortYourScore}</td>
                <td className="border border-[#C2C2C2] text-center p-[11px] text-[13px] font-bold">{shortMaxScore}</td>
              </tr>
            </tfoot>
          </table>

          {hasExtended && (
            <table className="w-full table-fixed border-collapse border border-[#C2C2C2] text-[13px] mt-[20px]">
              <thead>
                <tr>
                  <th colSpan={4} className="border border-[#C2C2C2] text-center align-middle p-[8px_11px] bg-[#dae1f7] font-normal">
                    <strong>Результаты выполнения заданий с развёрнутым ответом</strong>
                  </th>
                </tr>
                <tr>
                  <th className="w-[60px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">№</th>
                  <th className="border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Критерии<span className="text-[red]">**</span></th>
                  <th className="w-[120px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Ваш балл<span className="text-[red]">*</span></th>
                  <th className="w-[160px] border border-[#C2C2C2] text-center align-middle font-normal p-[8px_11px] bg-[#f2f2f2]">Максимальный балл<span className="text-[red]">*</span></th>
                </tr>
              </thead>
              <tbody>
                {(exam as any).extendedAnswers.map((answer: any, index: number) => (
                  <tr key={index} className={`hover:bg-[#dadada] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f2f2f2]'}`}>
                    <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px]">{answer.id}</td>
                    <td className="border border-[#C2C2C2] text-left align-middle p-[11px] text-[13px]"></td>
                    <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px] font-bold">{answer.yourScore}</td>
                    <td className="border border-[#C2C2C2] text-center align-middle p-[11px] text-[13px] font-bold">{answer.maxScore}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#dae1f7] font-bold">
                  <td colSpan={2} className="border border-[#C2C2C2] text-right p-[11px] text-[13px] font-bold">Итого</td>
                  <td className="border border-[#C2C2C2] text-center p-[11px] text-[13px] font-bold">{extendedYourScore}</td>
                  <td className="border border-[#C2C2C2] text-center p-[11px] text-[13px] font-bold">{extendedMaxScore}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
