import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class TestPy {


    public String getText() {
        StringBuilder sb = new StringBuilder();
        try {
            Process p = Runtime.getRuntime().exec("python pyt.py");
            BufferedReader stdInput = new BufferedReader(new
                    InputStreamReader(p.getInputStream()));

            BufferedReader stdError = new BufferedReader(new
                    InputStreamReader(p.getErrorStream()));

            String s = "";
            while ((s = stdInput.readLine()) != null) {
                sb.append(s);
            }


            while ((s = stdError.readLine()) != null) {
                //System.out.println(s);
            }

        } catch (IOException e) {

        }
        return sb.toString();


    }

}
