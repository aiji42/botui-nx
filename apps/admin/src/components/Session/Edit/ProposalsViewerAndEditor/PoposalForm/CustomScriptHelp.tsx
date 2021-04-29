import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { FC } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import monkai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai'

SyntaxHighlighter.registerLanguage('javascript', js)

export const CustomScriptHelp: FC = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" color="textSecondary">
            ユーザの入力値を取り出す
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body2" color="textSecondary">
              このスクリプト以前にユーザが入力した値は<code>values</code>
              オブジェクトに格納されています。
              <br />
              各フォームの値名をキーとしてアクセスすることで取り出せます。
            </Typography>
            <SyntaxHighlighter language="javascript" style={monkai}>
              {`console.log(values.familyName) // 姓
console.log(values['自身で設定したカスタムインプットの名前'])`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" color="textSecondary">
            非同期処理
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body2" color="textSecondary">
              <code>Promise</code>
              を返却することで、サーバ通信などの非同期処理を同期的に取り扱えます。
            </Typography>
            <SyntaxHighlighter language="javascript" style={monkai}>
              {`// 3秒待つ
return new Promise((resolve) =>
  setTimeout(resolve, 3000))`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" color="textSecondary">
            選択肢の生成
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body2" color="textSecondary">
              カスタムチェックボックス・カスタムラジオボタン・カスタムセレクトの選択肢を動的に生成することが可能です。
              <br />
              一つの選択肢は次のオブジェクトで構成されます。
              <code>{`{ label: '選択肢名', value: '値名' }`}</code>
              <br />
              <code>window.botui.customChoice</code>
              に対して、対象のフォーム名と一致する名前で選択肢オブジェクトの配列を代入してください。
            </Typography>
            <SyntaxHighlighter language="javascript" style={monkai}>
              {`window.botui.customChoice['フォームのname'] = [
  { label: 'りんご', value: 'apple' },
  { label: 'オレンジ', value: 'orange' },
  { label: 'レモン', value: 'lemon' },
]`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export const CustomValidationHelp: FC = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" color="textSecondary">
          使用方法
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <code>value</code>にユーザがフォームに入力した値が入っています。
            <br />
            1文字以上の文字列を返却するとエラーメッセージとしてフォームに表示され、確定ボタンの押下を無効にできます。文字列以外を返却すると、ユーザが確定ボタンを押下できるようになります。
          </Typography>
          <SyntaxHighlighter language="javascript" style={monkai}>
            {`if (typeof value === 'string' && value.length < 10) {
  return '10文字以上で入力してください。'
}
return true`}
          </SyntaxHighlighter>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export const FormPushCustomValueHelp: FC = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" color="textSecondary">
          使用方法
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" color="textSecondary">
            このスクリプト以前にユーザが入力した値は<code>values</code>
            オブジェクトに格納されています。
            <br />
            各フォームの値名をキーとしてアクセスすることで取り出せます。
            <br />
            返却された値がカスタム値として使用されます。
          </Typography>
          <SyntaxHighlighter language="javascript" style={monkai}>
            {`// 姓名を連結する例
return values.familyName + values.firstName`}
          </SyntaxHighlighter>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export const FormPushResultHelp: FC = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" color="textSecondary">
          使用方法
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <code>response</code>
            にフォームの送信結果レスポンスが格納されています。
          </Typography>
          <SyntaxHighlighter language="javascript" style={monkai}>
            {`// フォーム送信フォのページに遷移する例
window.location.href = response.url`}
          </SyntaxHighlighter>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
