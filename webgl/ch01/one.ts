// 获取canvas画布
let gl: WebGLRenderingContext;
const canvas = document.getElementById('webgl') as HTMLCanvasElement;
if(canvas) {
  // 通过方法getContext获取Webgl上下文
  gl = canvas.getContext('webgl') as WebGLRenderingContext;
} else {
  throw new Error('can not find container by specified selector');
}
// 顶点着色器源码
// 给内置变量gl_PointSize赋值像素大小
var vertextShaderSource = `
void main(){
  gl_PointSize=20.0;
  gl_Position=vec4(0.0,0.0,0.0,1.0);
}
`;

// 片元着色器源码
// gl_FragColor 定义片元颜色
var fragShaderSource = `
void main(){
  gl_FragColor= vec4(1.0,0.0,0.0,1.0);
}
`;

if(!gl) {
  throw new Error('Canvas WebGLRenderingContext not found, please check it is running in Browser environment');
}
// 初始化着色器
var program = initShader(gl, vertextShaderSource, fragShaderSource);
// 开始绘制
gl.drawArrays(gl.POINTS, 0, 1);
//声明初始化着色器函数
function initShader(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
  //创建顶点着色器对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if(!vertexShader) {
    throw new Error('createShader error');
  }
  //创建片元着色器对象
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if(!fragmentShader) {
    throw new Error('createShader error');
  }
  //引入顶点、片元着色器源代码
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  //编译顶点、片元着色器
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  //创建程序对象program
  const program = gl.createProgram();
  if(!program) {
    throw new Error('createProgram error');
  }
  //附着顶点着色器和片元着色器到program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  //链接program
  gl.linkProgram(program);
  //使用program
  gl.useProgram(program);
  //返回程序program对象
  return program;
}

