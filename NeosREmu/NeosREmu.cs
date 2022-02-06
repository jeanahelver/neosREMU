using System;
using System.Collections.Generic;
using System.Linq;
namespace NeosREmu
{
    public class NeosREmu
    {
        public string LastPacked { get; private set; }

        public uint FrameCount { get; private set; }

        public byte[][] currentColor { get; private set; }
        public bool DrawRawRGB(byte[][] screenData,int numOfColors,out string dataToSend)
        {
            var usedColors = new Dictionary<byte[],uint>();
            for (int i = 0; i < screenData.Length; i++)
            {
                if (usedColors.ContainsKey(screenData[i]))
                {
                    usedColors[screenData[i]]++;
                }
                else
                {
                    usedColors.Add(screenData[i], 0);
                }
            }
            var sortedColors = (from color in usedColors
                               orderby color.Value ascending
                               select color.Key).ToArray();
            Array.Resize(ref sortedColors, numOfColors);
            var colorList = new List<int>();
            for (int i = 0; i < screenData.Length; i++)
            {
                var color = screenData[i];
                int smallest = numOfColors;
                int smallestIndex = 0;
                var currentColor = 0;
                foreach (var item in sortedColors)
                {
                    var inColor = Math.Abs(color[0] - item[0]) + Math.Abs(color[1] - item[1]) + Math.Abs(color[2] - item[2]);
                    if (inColor < smallest)
                    {
                        smallest = inColor;
                        smallestIndex = currentColor;
                    }
                    currentColor++;
                }
                colorList.Add(smallestIndex);
            }
            var newPacked = "";
            FrameCount++;
            if(newPacked == LastPacked)
            {
                dataToSend = newPacked;
                return true;
            }
            else
            {
                dataToSend = null;
                return false;
            }
        }
    }
}
