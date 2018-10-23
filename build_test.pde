import ddf.minim.*;
import ddf.minim.analysis.*;

HTimer timer;
Minim       minim;
AudioPlayer myAudio;
FFT         myAudioFFT;

boolean       showVisualizer   = true;

int         myAudioRange     = 256;
int         myAudioMax       = 100;

float       myAudioAmp       = 20.0;
float       myAudioIndex     = 0.05;
float       myAudioIndexAmp  = myAudioIndex;
float       myAudioIndexStep = 0.025;

float[]       myAudioData      = new float[myAudioRange];

// ************************************************************************************


HDrawablePool pool;
int           poolMax          = 100;


int         rectSize         = 3;

int         stageMargin      = 100;
int         stageWidth       = (myAudioRange * rectSize) + (stageMargin * 2);
int         stageHeight      = 900;

float       xStart           = stageMargin;
float       yStart           = stageMargin;
int         xSpacing         = rectSize;

// ************************************************************************************

color       bgColor          = #333333;

// ************************************************************************************
int           poolCols         = 5;
int           poolRows         = 5;
int           poolDepth        = 5;

//                                v BASE = black             v SNARE = white
color[]       palette          = {
  #000000, #666666, #666666, #FFFFFF, #666666, #666666, #666666, #666666, #666666, #666666, #666666
};

int           rotateNumX       = 0;
int           rotateNumY       = 0;
int           rotateNumZ       = 0;

// ************************************************************************************


void setup() {
  size(stageWidth, stageHeight);
  H.init(this).background(#202020).autoClear(false);
  background(255);

  minim   = new Minim(this);
  myAudio = minim.loadFile("data2.mp3");
  myAudio.loop();
  myAudio.play();

  myAudioFFT = new FFT(myAudio.bufferSize(), myAudio.sampleRate());
  myAudioFFT.linAverages(myAudioRange);
  // myAudioFFT.window(FFT.NONE);
  myAudioFFT.window(FFT.GAUSS);

  timer = new HTimer()
    .numCycles(35)
      .interval(3500)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            background(255);
          }
        }
  );

  pool = new HDrawablePool(poolMax);
  pool.autoAddToStage()
    .add ( new HRect(0).rounding(10) )
      .onCreate (
      new HCallback() {
        public void run(Object obj) {
          int ranIndex = (int)random(myAudioRange);

          HDrawable d = (HDrawable) obj;
          d
            .stroke(0)
            .strokeWeight(0.25)
            .fill(255, 225)
            .anchorAt(H.CENTER)
            .rotation(0)
            //.loc( (int)random(width), stageHeight-(int)random(height)/2)
          .loc( (int)random(width), 40)
            .extras( new HBundle().num("i", ranIndex) )
            ;
        }
      }
  )
    .requestAll()
      ;
}

void draw() {
  //background(bgColor);

  myAudioFFT.forward(myAudio.mix);
  myAudioDataUpdate();


  for (int i = 0; i < myAudioRange; ++i) {
    stroke(0); 
    fill(255, 5);
    float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
    // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);
    rect( xStart + (i*xSpacing), yStart, rectSize, tempIndexAvg*2);

   
    //stroke(#40A629); noFill();
    //line(xStart + (i*xSpacing),yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp),xStart + (i*xSpacing) + rectSize, yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp));

    myAudioIndexAmp+=myAudioIndexStep;
  }
  myAudioIndexAmp = myAudioIndex;

  //stroke(#FF3300); noFill();
  //line(stageMargin, stageMargin+myAudioMax, width-stageMargin, stageMargin+myAudioMax);


  H.drawStage();

  for (HDrawable d : pool) {
    HBundle tempExtra = d.extras();
    int i = (int)tempExtra.num("i");

    int fftFillColor = (int)map(myAudioData[i], 0, myAudioMax, 0, 255);
    int fftSize      = (int)map(myAudioData[i], 0, myAudioMax*4, 0, 300);

    d.fill(fftFillColor, 225).size(fftSize);
  }

  if (showVisualizer) myAudioDataWidget();


  timer = new HTimer()
    .numCycles(1)
      .interval(136137)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            background(random(255));
          }
        }
  );

  timer = new HTimer()
    .numCycles(1)
      .interval(208313)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            background(0, 25);
          }
        }
  );
}


void myAudioDataUpdate() {
  for (int i = 0; i < myAudioRange; ++i) {
    float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
    float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);
    myAudioData[i]     = tempIndexCon;
    myAudioIndexAmp+=myAudioIndexStep;
  }
  myAudioIndexAmp = myAudioIndex;
}

void myAudioDataWidget() {
  // noLights();
  // hint(DISABLE_DEPTH_TEST);
  noStroke(); 
  fill(0, 200); 
  rect(0, height-150, width, 150);
  for (int i = 0; i < myAudioRange; ++i) {
    fill(#CCCCCC); 
    rect(xStart + (i*xSpacing), (height-myAudioData[i]), 1, myAudioData[i]);
  }
  // hint(ENABLE_DEPTH_TEST);
}
//xStart + (i*xSpacing), yStart, rectSize, tempIndexAvg*2


void stop() {
  myAudio.close();
  minim.stop();  
  super.stop();
}

var processingCode = "build_test.pde";
var jsCode = Processing.compile(processingCode).sourceCode;
