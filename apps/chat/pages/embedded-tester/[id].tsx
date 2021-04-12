import { FC, useEffect, useState, Fragment } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface TesterProps {
  id?: string
}

const script = (id: string, open: boolean) => `
var call = function(src, handler){
    var base = document.getElementsByTagName("script")[0];
    var obj = document.createElement("script");
    obj.async = true;
    obj.src= src;
    if(obj.addEventListener){
        obj.onload = function () {
        handler();
        }
    }else{
        obj.onreadystatechange = function () {
            if ("loaded" == obj.readyState || "complete" == obj.readyState){
                obj.onreadystatechange = null;
                handler();
            }
        }
    }
    base.parentNode.insertBefore(obj,base);
};

call("/api/script/botui/chat.min.js", function(){Botui.start("/?sessionId=${id}", ${open})})
`

const Tester: FC<TesterProps> = ({ id }) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Fragment>
      {mounted && (
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: script(id ?? '', Boolean(router.query.open))
            }}
          />
        </Head>
      )}
      <form id="testForm" method="post" action="/api/form-push-test">
        <input type="text" name="familyName" placeholder="familyName" />
        <input type="text" name="firstName" placeholder="firstName" />
        <input type="text" name="familyNameKana" placeholder="familyNameKana" />
        <input type="text" name="firstNameKana" placeholder="firstNameKana" />
      </form>
    </Fragment>
  )
}

export default Tester

export const getServerSideProps: GetServerSideProps<
  TesterProps,
  { id: string }
> = async (context) => {
  return { props: { id: context.params?.id } }
}
