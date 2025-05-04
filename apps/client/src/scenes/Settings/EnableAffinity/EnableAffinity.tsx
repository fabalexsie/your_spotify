import { Button } from "@mui/material";
import { useCallback } from "react";
import Text from "../../../components/Text";
import TitleCard from "../../../components/TitleCard";
import { enableAffinity } from "../../../services/redux/modules/settings/thunk";
import { useAppDispatch } from "../../../services/redux/tools";
import { GlobalPreferences } from "../../../services/types";
import SettingLine from "../SettingLine";

interface EnableAffinityProps {
  settings: GlobalPreferences;
}

export default function EnableAffinity({ settings }: EnableAffinityProps) {
  const dispatch = useAppDispatch();

  console.log("affiinity", settings);

  const handleEnable = useCallback(() => {
    if (!settings) {
      return;
    }
    dispatch(enableAffinity(!settings.allowAffinity)).catch(console.error);
  }, [dispatch, settings]);

  return (
    <TitleCard title="Affinity">
      <SettingLine
        left={<Text>Enable affinity feature</Text>}
        right={
          <Button onClick={handleEnable}>
            {settings.allowAffinity ? "YES" : "NO"}
          </Button>
        }
      />
    </TitleCard>
  );
}
