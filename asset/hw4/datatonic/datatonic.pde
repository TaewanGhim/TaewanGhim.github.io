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
int           poolMax          = 150;


float         rectSize         = 6.6;

int         stageMargin      = 120;
float       stageWidth       = (myAudioRange * rectSize) + (stageMargin * 2);
int         stageHeight      = 900;

float       xStart           = stageMargin;
float       yStart           = stageMargin;
float       xSpacing         = rectSize;

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

boolean sketchFullScreen() {
  return true;
}

void setup() {
  frameRate(60);
  size(displayWidth, displayHeight);


  H.init(this).background(#202020).autoClear(false);
  background(0);

  minim   = new Minim(this);
  myAudio = minim.loadFile("data4.mp3");
  myAudio.loop();
  myAudio.play();

  myAudioFFT = new FFT(myAudio.bufferSize(), myAudio.sampleRate());
  myAudioFFT.linAverages(myAudioRange);
  // myAudioFFT.window(FFT.NONE);
  myAudioFFT.window(FFT.GAUSS);

  timer = new HTimer()
    .numCycles(20)
      .interval(3500)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            background(0.50);
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
            .stroke(200)
            .strokeWeight(0.15)
            .fill(255, 35)
            .anchorAt(H.CENTER)
            .rotation(0)
            //.loc( (int)random(width), stageHeight-(int)random(height)/2)
          .loc( (int)random(width), (height-yStart*1.9)/2)
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


  H.drawStage();

  for (HDrawable d : pool) {
    HBundle tempExtra = d.extras();
    int i = (int)tempExtra.num("i");

    int fftFillColor = (int)map(myAudioData[i], 0, myAudioMax, 255,0);
    int fftSize      = (int)map(myAudioData[i], 0, myAudioMax, 0, random(650));

    d.fill(fftFillColor,100).size(fftSize);
  }  
  
  
  for (int i = 0; i < myAudioRange; ++i) {
    stroke(255,150);
    strokeWeight(0.25); 
    fill(0, 5);
    float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
    // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);
    rect( xStart + (i*xSpacing), yStart*1, rectSize, tempIndexAvg);

    
    myAudioIndexAmp+=myAudioIndexStep;
  }

  for (int i = 0; i < myAudioRange; ++i) {

    stroke(255,150);
    strokeWeight(0.1); 
    fill(0,5);
    float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
    // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);

    ellipse( xStart + (i*xSpacing), height-yStart*3, rectSize*5, tempIndexAvg*0.3);
    // xStart + (i*xSpacing), (height-myAudioData[i]), 1, myAudioData[i]

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

    int fftFillColor = (int)map(myAudioData[i], 0, myAudioMax, 255,0);
    int fftSize      = (int)map(myAudioData[i], 0, myAudioMax, 0, random(650));

    d.fill(fftFillColor,100).size(fftSize);
  }

  if (showVisualizer) myAudioDataWidget();


  timer = new HTimer()
    .numCycles(1)
      .interval(136137)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            background(random(0,255),50);
            for (int i = 0; i < myAudioRange; ++i) {
             stroke(150);
              strokeWeight(0.5); 
              fill(255, 5);
              float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
              // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);
              rect( xStart + (i*xSpacing), yStart*1, rectSize, tempIndexAvg*2);


              myAudioIndexAmp+=myAudioIndexStep;
            }

            for (int i = 0; i < myAudioRange; ++i) {

              stroke(150);
              strokeWeight(0.5); 
              fill(255, 5);
              float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
              // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);

             ellipse( xStart + (i*xSpacing), height-yStart*3, rectSize*5, tempIndexAvg*0.3);
              // xStart + (i*xSpacing), (height-myAudioData[i]), 1, myAudioData[i]

              //stroke(#40A629); noFill();
              //line(xStart + (i*xSpacing),yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp),xStart + (i*xSpacing) + rectSize, yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp));

              myAudioIndexAmp+=myAudioIndexStep;
            }

            for (int i = 0; i < myAudioRange; ++i) {

              stroke(150);
              strokeWeight(0.5); 
              fill(255, 5);
              float tempIndexAvg = (myAudioFFT.getAvg(i) * myAudioAmp) * myAudioIndexAmp;
              // float tempIndexCon = constrain(tempIndexAvg, 0, myAudioMax);

              //line( xStart + (i*xSpacing), height-yStart*3, height/2, tempIndexAvg*0.3);
              // xStart + (i*xSpacing), (height-myAudioData[i]), 1, myAudioData[i]

              //stroke(#40A629); noFill();
              //line(xStart + (i*xSpacing),yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp),xStart + (i*xSpacing) + rectSize, yStart + ((i*(myAudioAmp+myAudioIndexAmp))/myAudioAmp));
              
//              stroke(255, 25);
//    strokeWeight(0.5);
//    line( xStart + (i*xSpacing), height-yStart*3, random(xStart,xStart + (i*xSpacing)), yStart);
//    
    
              myAudioIndexAmp+=myAudioIndexStep;
            }

            myAudioIndexAmp = myAudioIndex;
          }
        }
  );

  timer = new HTimer()
    .numCycles(1)
      .interval(208313)
        .callback(
        new HCallback() { 
          public void run(Object obj) {
            noStroke();
fill(255,255);
rect(0,0,displayWidth,displayHeight);

            background(0);
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
  fill(50, 100); 
  rect(0, height-150, width,150);
  for (int i = 0; i < myAudioRange; ++i) {
    fill(255); 
    rect(xStart + (i*xSpacing), height-50, 1, -myAudioData[i]*0.5);
  }
  // hint(ENABLE_DEPTH_TEST);
}
//xStart + (i*xSpacing), yStart, rectSize, tempIndexAvg*2


void stop() {
  myAudio.close();
  minim.stop();  
  super.stop();
}

